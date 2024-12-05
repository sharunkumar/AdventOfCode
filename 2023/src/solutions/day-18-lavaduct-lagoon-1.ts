import { Solution } from "../utils"

const directions = {
  L: [0, -1] as [number, number],
  R: [0, 1] as [number, number],
  U: [-1, 0] as [number, number],
  D: [1, 0] as [number, number],
}

export default class LavaductLagoon extends Solution {
  solve(input: string) {
    const points: [number, number][] = [[0, 0]]
    let boundary = 0

    this.get_lines(input)
      .map(
        (line) => line.split(" ") as [keyof typeof directions, string, string],
      )
      .map(([dir, num, hex]) => {
        const n = Number(num)
        boundary += n
        return directions[dir].map((d) => d * n) as [number, number]
      })
      .forEach((x) => {
        const [r, c] = points.at(-1)!
        points.push([x[0] + r, x[1] + c])
      })

    let area =
      Math.abs(
        points
          .map(
            (point, i) =>
              point[0] *
              (points.at(i - 1)![1] - points.at((i + 1) % points.length)![1]),
          )
          .sum(),
      ) / 2
    let interior = area - boundary / 2 + 1

    return interior + boundary
  }
}
