import { Solution, numberc } from "../utils"

export default class HotSprings extends Solution {
  solve(input: string) {
    this.get_lines(input)
      .map((line) => line.split(" "))
      .map(([first, second]) => [first, second.split(",").map(numberc)])
      .pipelog()
  }
}
