import { Solution } from "../utils"

type direction = "L" | "R" | "U" | "D"

export default class LavaductLagoon extends Solution {
  solve(input: string) {
    this.get_lines(input)
      .map((line) => line.split(" ") as [direction, string, string])
      .map(([dir, num, hex]) => [dir, Number(num), hex])
      .pipelog()
  }
}
