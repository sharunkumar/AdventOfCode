import { eq } from "lodash"
import { Solution, inclusive_between as ibw, numberc } from "../utils"
import { MinPriorityQueue } from "@datastructures-js/priority-queue"

type item = [number, number, number, number, number, number]

export default class ClumsyCrucible extends Solution {
  solve(input: string) {
    const map = this.get_matrix(input).map((row) =>
      row.map((char) => numberc(char) as number),
    )

    // this.print_matrix(map)

    const seen = new Set<string>()

    const queue = new MinPriorityQueue<item>((item) => item[0])

    queue.push([0, 0, 0, 0, 0, 0])

    while (queue.size()) {
      const [heat, row, col, di, dj, steps] = queue.pop()

      const key = [heat, row, col, di, dj, steps].join("$")

      if (row == map.length - 1 && col == map[0].length - 1) {
        return heat
      }

      if (seen.has(key)) continue

      seen.add(key)

      if (steps < 3 && !(di == 0 && dj == 0)) {
        let nextrow = row + di
        let nextcol = col + dj

        if (
          ibw(nextrow, 0, map.length - 1) &&
          ibw(nextcol, 0, map[0].length - 1)
        ) {
          queue.push([
            heat + map[nextrow][nextcol],
            nextrow,
            nextcol,
            di,
            dj,
            steps + 1,
          ])
        }
      }

      ;[
        [0, 1],
        [1, 0],
        [0, -1],
        [-1, 0],
      ].map(([nextdi, nextdj]) => {
        if (
          !(nextdi == di && nextdj == dj) &&
          !(nextdi == -di && nextdj == -dj)
        ) {
          let nextrow = row + nextdi
          let nextcol = col + nextdj
          if (
            ibw(nextrow, 0, map.length - 1) &&
            ibw(nextcol, 0, map[0].length - 1)
          ) {
            queue.push([
              heat + map[nextrow][nextcol],
              nextrow,
              nextcol,
              nextdi,
              nextdj,
              1,
            ])
          }
        }
      })
    }
  }
}
