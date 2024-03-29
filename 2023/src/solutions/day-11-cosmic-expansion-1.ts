import { Solution, manhattan_distance } from "../utils"

interface coord {
  i: number
  j: number
}

type matrix = string[][]

export default class CosmicExpansion extends Solution {
  solve(input: string) {
    let universe = this.get_matrix(input)

    universe = expand(universe)

    const stars = get_coords(universe, (c) => c === "#")

    return stars
      .map((s1, i) => {
        return stars.map((s2, j) => {
          if (i < j) {
            return manhattan_distance(s1.i, s1.j, s2.i, s2.j)
          }
        })
      })
      .flat()
      .filter(Boolean)
      .sum()
  }
}

function expand(universe: matrix): matrix {
  let new_universe = [] as matrix

  for (let r = 0; r < universe.length; r++) {
    const row = universe[r]
    new_universe.push(row)
    if (row.filter((c) => c === ".").length == row.length) {
      new_universe.push(row)
    }
  }

  let columns = [] as number[]

  for (let c = 0; c < new_universe[0].length; c++) {
    no_star: {
      for (let r = 0; r < new_universe.length; r++) {
        if (new_universe[r][c] == "#") {
          break no_star
        }
      }
      columns.push(c)
    }
  }

  // console.log({ columns })

  new_universe = new_universe.map((line) => {
    let new_line = line
      .map((c, idx) => {
        if (columns.includes(idx)) {
          return [c, "."]
        }
        return c
      })
      .flat()
    return new_line
  })

  return new_universe
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
