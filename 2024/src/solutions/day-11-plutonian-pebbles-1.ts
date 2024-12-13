import { Solution } from "#/utils";

export default class PlutonianPebbles extends Solution {
  solve(input: string) {
    let stones = input.split(" ").map((x) => parseInt(x));

    for (let i = 0; i < 25; i++) {
      let output: number[] = [];

      for (const stone of stones) {
        if (stone === 0) {
          output.push(1);
          continue;
        }

        const string = stone.toString();
        const length = string.length;

        if (length % 2 === 0) {
          output.push(parseInt(string.slice(0, length / 2)));
          output.push(parseInt(string.slice(length / 2)));
        } else {
          output.push(stone * 2024);
        }
      }

      stones = output;
    }

    return stones.length;
  }
}
