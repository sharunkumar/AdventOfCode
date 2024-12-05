import { Solution, regexMatch } from "../utils"

const directions = {
  L: [0, -1] as [number, number],
  R: [0, 1] as [number, number],
  U: [-1, 0] as [number, number],
  D: [1, 0] as [number, number],
}

const dirmap: {
  [key: string]: keyof typeof directions
} = {
  0: "R",
  1: "D",
  2: "L",
  3: "U",
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
        // console.log( hex, parseInt(hex.slice(2, -2), 16), dirmap[hex.slice(-2, -1)], )
        const n = parseInt(hex.slice(2, -2), 16)
        boundary += n
        return directions[dirmap[hex.slice(-2, -1)]].map((d) => d * n) as [
          number,
          number,
        ]
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
