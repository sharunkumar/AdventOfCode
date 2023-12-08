import { Solution, ascending, descending } from "../utils"

class OperationResult {
  constructor(
    public target_monkey: number,
    public item: number,
  ) {}
}

class Monkey {
  public inspected: number = 0
  constructor(
    public index: number,
    public items: number[],
    public operation: string,
    public test_divisible_by: number,
    public true_monkey: number,
    public false_monkey: number,
  ) {}

  operate() {
    let item = this.items.shift()
    if (!item) return
    this.inspected++
    // console.log(this.operation.replace("old", item + ""))
    let result = Number(eval(this.operation.replace(/old/g, item + "")))

    //monke gets bored
    result = Math.floor(result / 3)

    let target_monkey =
      result % this.test_divisible_by == 0
        ? this.true_monkey
        : this.false_monkey

    const op_result = new OperationResult(target_monkey, result)
    // console.log({ index: this.index, op_result })
    return op_result
  }

  toString() {
    return `Monkey: ${this.index}: ${this.items.join(", ")}`
  }
}

export default class MonkeyInTheMiddle extends Solution {
  solve(input: string) {
    const monkeys = this.get_blocks(input).map((block, idx) => {
      let lines = this.get_lines(block)
      //.pipelog()
      let starting = lines[1]
        .trim()
        .replace("Starting items: ", "")
        .split(", ")
        .map(Number) //.pipelog()
      let operation = lines[2].trim().replace("Operation: new = ", "")
      let test_divisible_by = Number(lines[3].split(" ").pop())
      let true_case = Number(lines[4].split(" ").pop())
      let false_case = Number(lines[5].split(" ").pop())
      const monkey = new Monkey(
        idx,
        starting,
        operation,
        test_divisible_by,
        true_case,
        false_case,
      )
      // console.log({ monkey })
      return monkey
    })
    // .pipelog()
    // .map(pipelog)

    // let ops = monkeys.map(monke => monke.operate()).map(op => op())

    for (let round = 0; round < 20; round++) {
      console.log({ round })
      for (let m = 0; m < monkeys.length; m++) {
        const monke = monkeys[m]
        // const op = ops[m]
        while (monke.items.length > 0) {
          let result = monke.operate()
          if (!result) break
          monkeys[result.target_monkey].items.push(result.item)
        }
      }
      monkeys.map((m) => m.toString()).pipelog()
    }

    let [first, second, _] = monkeys
      .map((m) => m.inspected)
      .sort(descending)
      .pipelog()

    // monkeys.pipelog()

    return first * second
  }
}
