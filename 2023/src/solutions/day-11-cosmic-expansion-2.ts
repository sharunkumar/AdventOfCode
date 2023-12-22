import { max, min } from "lodash"
import { Solution, inclusive_between, manhattan_distance } from "../utils"

interface coord {
  i: number
  j: number
}

interface expansions {
  rows: number[]
  columns: number[]
}

type matrix = string[][]

export default class CosmicExpansion extends Solution {
  solve(input: string) {
    let universe = this.get_matrix(input)

    const adjustment_factor = 2 - 1

    const exp = expand(universe)

    console.log({ exp })

    this.print_matrix(universe)

    const stars = get_coords(universe, (c) => c === "#")

    return stars
      .map((s1, i) => {
        return stars.map((s2, j) => {
          if (i < j) {
            const row_adjustment: number =
              exp.rows.filter((r) =>
                inclusive_between(r, min([s1.i, s2.i])!, max([s1.i, s2.i])!),
              ).length * adjustment_factor

            const col_adjustment: number =
              exp.columns.filter((c) =>
                inclusive_between(c, min([s1.j, s2.j])!, max([s1.j, s2.j])!),
              ).length * adjustment_factor
            // console.log({ s1, s2, row_adjustment, col_adjustment })
            return (
              manhattan_distance(s1.i, s1.j, s2.i, s2.j) +
              row_adjustment +
              col_adjustment
            )
          }
        })
      })
      .flat()
      .filter(Boolean)
      .sum()
  }
}

function expand(universe: matrix): expansions {
  let columns = [] as number[]
  let rows = [] as number[]

  for (let r = 0; r < universe.length; r++) {
    const row = universe[r]
    if (row.filter((c) => c === ".").length == row.length) {
      rows.push(r)
    }
  }

  for (let c = 0; c < universe[0].length; c++) {
    no_star: {
      for (let r = 0; r < universe.length; r++) {
        if (universe[r][c] == "#") {
          break no_star
        }
      }
      columns.push(c)
    }
  }

  return {
    rows,
    columns,
  }
}

function get_coords(m: matrix, fn: (element: string) => boolean): coord[] {
  return m
    .map((row, i) => {
      return row.map((char, j) => {
        if (fn(char)) {
          return {
            i,
            j,
          }
        }
      })
    })
    .flat()
    .filter(Boolean)
}
