import { Solution, numberc } from "../utils"

interface coord {
  i: number
  j: number
}

export default class StepCounter extends Solution {
  solve(input: string) {
    const [inp, steps] = this.get_blocks(input).map(numberc) as [string, number]

    const map = this.get_matrix(inp)

    let start: coord = { i: 0, j: 0 }

    map.forEach((row, r) =>
      row.forEach((char, c) => {
        if (char === "S") {
          start.i = r
          start.j = c
        }
      }),
    )

    console.log(start)
  }
}
