import { descending, Solution, sum } from "../utils"

export default class CalorieCounting extends Solution {
  solve(input: string): any {
    const [a, b, c, ..._] = this.get_blocks(input)
      .map(this.get_lines)
      .map((item_aray) => item_aray.map((item) => parseFloat(item)).reduce(sum))
      .sort(descending)

    return a + b + c
  }
}
