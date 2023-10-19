import { descending, Solution, sum } from "../utils";
import { Stack } from "../utils/stack";

class Move {
  count: number;
  from_stack: number;
  to_stack: number;
  constructor(count: number, from_stack: number, to_stack: number) {
    this.count = count;
    this.from_stack = from_stack;
    this.to_stack = to_stack;
  }
}

export default class SupplyStacks extends Solution {
  stacks: Stack<string>[] = [];
  moves: Move[] = [];

  solve(input: string) {
    const [stacks_input, moves_input] = this.get_blocks(input);

    const stack_array = this.get_lines(stacks_input)
      .reverse()
      .map((item, idx) => [idx, item])
      .filter(([idx, item]) => parseInt(idx + "") > 0)
      .map((item) => item[1] + "");

    for (let i = 1; i < stack_array[0].length; i += 4) {
      this.stacks.push(new Stack<string>());
    }

    stack_array.forEach((item) => {
      for (let i = 1, j = 0; i < item.length; i += 4, j++) {
        if (item.charAt(i) !== " ") this.stacks[j].push(item.charAt(i));
      }
    });

    console.log(this.stacks);

    this.moves = this.get_lines(moves_input)
      .map((item) => item.split(" "))
      .map(
        (item) =>
          new Move(parseInt(item[1]), parseInt(item[3]), parseInt(item[5])),
      );

    this.moves.forEach((move) => {
      let from = this.stacks[move.from_stack - 1];
      let to = this.stacks[move.to_stack - 1];

      let temp = [];

      for (let idx = 0; idx < move.count; idx++) {
        temp.push(from.pop() + "");
      }

      temp.reverse().forEach((item) => to.push(item));
    });

    console.log(this.stacks);

    return this.stacks
      .map((item) => item.peek())
      .pipelog()
      .join("");
  }
}
