import { max } from "lodash"
import { Solution, inclusive_between as ibw } from "../utils"

interface direction {
  di: number
  dj: number
}

interface coord {
  i: number
  j: number
}

interface vector {
  point: coord
  direction: direction
}

export default class TheFloorWillBeLava extends Solution {
  solve(input: string) {
    const map = this.get_matrix(input) //.pipelog()

    function compute(initial: vector) {
      const floor = map.map((row) => row.map((c) => c)) //.pipelog()
      // this.print_matrix(map)
      function m({ i, j }: coord) {
        return map[i][j]
      }

      function f({ i, j }: coord, val: string | undefined = undefined) {
        if (!val) return floor[i][j]
        else {
          try {
            floor[i][j] = val
          } catch (_) {}
        }
      }

      const fill: vector[] = [initial]

      const memory = new Set<string>()

      while (fill.length) {
        const v = fill.shift()!

        const next: coord = {
          i: v.point.i + v.direction.di,
          j: v.point.j + v.direction.dj,
        }

        // console.log(m(v.point), { next })

        f(v.point, "#")

        if (
          ibw(next.i, 0, map.length - 1) &&
          ibw(next.j, 0, map[0].length - 1)
        ) {
          const key = [
            v.point.i,
            v.point.j,
            v.direction.di,
            v.direction.dj,
          ].join("$")
          if (memory.has(key)) {
            continue
          } else {
            memory.add(key)
          }
          if (m(next) == ".") {
            fill.push({
              direction: v.direction,
              point: next,
            })
          } else if (m(next) == "|") {
            if (v.direction.dj == 0) {
              // same direction as flow
              fill.push({ direction: v.direction, point: next })
            } else {
              // flow is right angle
              fill.push({ point: next, direction: { di: -1, dj: 0 } })
              fill.push({ point: next, direction: { di: 1, dj: 0 } })
            }
          } else if (m(next) == "-") {
            if (v.direction.di == 0) {
              // same direction as flow
              fill.push({ direction: v.direction, point: next })
            } else {
              // flow is right angle
              fill.push({ point: next, direction: { di: 0, dj: 1 } })
              fill.push({ point: next, direction: { di: 0, dj: -1 } })
            }
          } else if (m(next) == "/") {
            if (v.direction.di == 0) {
              // horizontal
              if (v.direction.dj > 0) {
                // currently going right
                fill.push({ direction: { di: -1, dj: 0 }, point: next })
              } else {
                // currently going left
                fill.push({ direction: { di: 1, dj: 0 }, point: next })
              }
            } else {
              // vertical
              if (v.direction.di < 0) {
                // currently going up
                fill.push({ direction: { di: 0, dj: 1 }, point: next })
              } else {
                // currently going down
                fill.push({ direction: { di: 0, dj: -1 }, point: next })
              }
            }
          } else if (m(next) == "\\") {
            if (v.direction.di == 0) {
              // horizontal
              if (v.direction.dj > 0) {
                // currently going right
                fill.push({ direction: { di: 1, dj: 0 }, point: next })
              } else {
                // currently going left
                fill.push({ direction: { di: -1, dj: 0 }, point: next })
              }
            } else {
              // vertical
              if (v.direction.di < 0) {
                // currently going up
                fill.push({ direction: { di: 0, dj: -1 }, point: next })
              } else {
                // currently going down
                fill.push({ direction: { di: 0, dj: 1 }, point: next })
              }
            }
          }
        }
      }

      // console.error("---")
      // this.print_matrix(floor)
      return floor
        .map((row) => row.map((c) => (c == "#" ? 1 : 0)))
        .flat()
        .sum()
    }

    let result = 0

    let rows = map.map((row, i) => i)
    let cols = map[0].map((col, j) => j)

    result = max([
      ...rows.map((r) =>
        compute({ point: { i: r, j: -1 }, direction: { di: 0, dj: 1 } }),
      ),
      ...rows.map((r) =>
        compute({
          point: { i: r, j: map[0].length },
          direction: { di: 0, dj: -1 },
        }),
      ),
      ...cols.map((c) =>
        compute({ point: { i: -1, j: c }, direction: { di: 1, dj: 0 } }),
      ),
      ...cols.map((c) =>
        compute({
          point: { i: map.length, j: c },
          direction: { di: -1, dj: 0 },
        }),
      ),
    ])!

    return result
  }
}
