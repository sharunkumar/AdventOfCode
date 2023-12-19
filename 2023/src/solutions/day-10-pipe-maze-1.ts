import { Solution, numberc } from "../utils"

export default class PipeMaze extends Solution {
  solve(input: string) {
    let start_i = 0
    let start_j = 0
    const matrix = this.get_lines(input)
      .map((line, idxi) =>
        line.split("").map((c, idxj) => {
          if (c == "S") {
            start_i = idxi
            start_j = idxj
          }
          return c
        }),
      )
      .pipelog()

    console.log({ start_i, start_j })
  }
}
