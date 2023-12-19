import { Solution, numberc } from "../utils"

export default class PipeMaze extends Solution {
  solve(input: string) {
    this.get_lines(input)
      .map((line) => line.split(""))
      .pipelog()
  }
}
