import { Solution, regexMatch } from "../utils"

interface xmas {
  x: number
  m: number
  a: number
  s: number
}

export default class Aplenty extends Solution {
  solve(input: string) {
    const [first, second] = this.get_blocks(input)

    const parts = this.get_lines(second)
      .map((line) => regexMatch(line, /\d+/g).map(Number))
      .map((n): xmas => {
        return {
          x: n[0],
          m: n[1],
          a: n[2],
          s: n[3],
        }
      })
      .pipelog()
  }
}
