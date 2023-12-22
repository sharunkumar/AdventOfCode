import { Solution } from "../utils"

export default class LensLibrary extends Solution {
  solve(input: string) {
    return input
      .split(",")
      .map((s) => HASH(s))
      .sum()
  }
}

function HASH(inp: string): number {
  return inp
    .split("")
    .map((c) => c.charCodeAt(0))
    .reduce((previous, current) => {
      return ((previous + current) * 17) % 256
    }, 0)
}
