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
    const floor = this.get_matrix(input) //.pipelog()

    // this.print_matrix(map)
    function m({ i, j }: coord) {
      return map[i][j]
    }

    function f({ i, j }: coord, val: string | undefined = undefined) {
      if (!val) return floor[i][j]
      else {
        floor[i][j] = val
      }
    }

    const fill: vector[] = [
      {
        point: {
          i: 0,
          j: -1,
        },
        direction: {
          di: 0,
          dj: 1,
        },
      },
    ]

    const memory = new Set<string>()

    while (fill.length) {
      const v = fill.shift()!

      const next: coord = {
        i: v.point.i + v.direction.di,
        j: v.point.j + v.direction.dj,
      }

      // console.log(m(v.point), { next })

      f(v.point, "#")

      if (ibw(next.i, 0, map.length - 1) && ibw(next.j, 0, map[0].length - 1)) {
        const key = [v.point.i, v.point.j, v.direction.di, v.direction.dj].join(
          "$",
        )
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
}
