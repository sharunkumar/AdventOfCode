import { Solution } from "../utils"

const directions = {
  L: [0, -1],
  R: [0, 1],
  U: [-1, 0],
  D: [1, 0],
}

export default class LavaductLagoon extends Solution {
  solve(input: string) {
    this.get_lines(input)
      .map(
        (line) => line.split(" ") as [keyof typeof directions, string, string],
      )
      .map(([dir, num, hex]) => [dir, Number(num), hex])
      .pipelog()
  }
}
