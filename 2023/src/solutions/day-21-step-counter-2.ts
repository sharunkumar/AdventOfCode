import { Solution, inclusive_between as ibw, numberc } from "../utils"

interface coord {
  i: number
  j: number
}

function directions(c: coord): [coord, coord, coord, coord] {
  return [
    { i: c.i - 1, j: c.j }, // N
    { i: c.i + 1, j: c.j }, // S
    { i: c.i, j: c.j + 1 }, // E
    { i: c.i, j: c.j - 1 }, // W
  ]
}

export default class StepCounter extends Solution {
  constructor(public steps: number) {
    super()
  }
  solve(input: string) {
    const grid = this.get_matrix(input)

    let sr = 0
    let sc = 0

    grid.forEach((row, r) =>
      row.forEach((char, c) => {
        if (char === "S") {
          sr = r
          sc = c
        }
      }),
    )

    const size = grid.length

    function fill(sr: number, sc: number, ss: number) {
      const ans = new Set<string>()
      const seen = new Set<string>()

      seen.add(`${sr},${sc}`)
      let q: Array<[number, number, number]> = [[sr, sc, ss]]

      while (q.length > 0) {
        let [r, c, s] = q.shift()!

        if (s % 2 === 0) {
          ans.add(`${r},${c}`)
        }
        if (s === 0) {
          continue
        }

        for (let next of directions({ i: r, j: c })) {
          const { i: nr, j: nc } = next
          if (
            nr < 0 ||
            nr >= grid.length ||
            nc < 0 ||
            nc >= grid[0].length ||
            grid[nr][nc] === "#" ||
            seen.has(`${nr},${nc}`)
          ) {
            continue
          }
          seen.add(`${nr},${nc}`)
          q.push([nr, nc, s - 1])
        }
      }

      return ans.size
    }

    let grid_width = Math.floor(this.steps / size) - 1

    let odd = Math.pow(Math.floor(grid_width / 2) * 2 + 1, 2)
    let even = Math.pow(Math.floor((grid_width + 1) / 2) * 2, 2)

    let odd_points = fill(sr, sc, size * 2 + 1)
    let even_points = fill(sr, sc, size * 2)

    let corner_t = fill(size - 1, sc, size - 1)
    let corner_r = fill(sr, 0, size - 1)
    let corner_b = fill(0, sc, size - 1)
    let corner_l = fill(sr, size - 1, size - 1)

    let small_tr = fill(size - 1, 0, Math.floor(size / 2) - 1)
    let small_tl = fill(size - 1, size - 1, Math.floor(size / 2) - 1)
    let small_br = fill(0, 0, Math.floor(size / 2) - 1)
    let small_bl = fill(0, size - 1, Math.floor(size / 2) - 1)

    let large_tr = fill(size - 1, 0, Math.floor((size * 3) / 2) - 1)
    let large_tl = fill(size - 1, size - 1, Math.floor((size * 3) / 2) - 1)
    let large_br = fill(0, 0, Math.floor((size * 3) / 2) - 1)
    let large_bl = fill(0, size - 1, Math.floor((size * 3) / 2) - 1)

    return (
      odd * odd_points +
      even * even_points +
      corner_t +
      corner_r +
      corner_b +
      corner_l +
      (grid_width + 1) * (small_tr + small_tl + small_br + small_bl) +
      grid_width * (large_tr + large_tl + large_br + large_bl)
    )
  }
}
