import { assert } from "console"
import { Solution } from "../utils"
import { isUndefined } from "lodash"

export default class PipeMaze extends Solution {
  solve(input: string) {
    let start_i = 0
    let start_j = 0
    const matrix = this.get_lines(input).map((line, idxi) =>
      line.split("").map((c, idxj) => {
        if (c == "S") {
          start_i = idxi
          start_j = idxj
        }
        return c
      }),
    )
    // .pipelog()

    let possible_s = ["|", "-", "J", "L", "7", "F"]

    interface coord {
      i: number
      j: number
    }

    let q = [] as coord[]
    let loop = [] as coord[]

    // console.log({ start_i, start_j })

    function not_seen(i: number, j: number) {
      return !loop.some((c) => c.i == i && c.j == j)
    }

    q.push({ i: start_i, j: start_j })
    loop.push({ i: start_i, j: start_j })

    while (q.length) {
      const { i, j } = q.shift()!

      const ch = matrix[i][j]

      // console.log({ ch })

      if (
        i > 0 &&
        "S|JL".includes(ch) &&
        "|7F".includes(matrix[i - 1][j]) &&
        not_seen(i - 1, j)
      ) {
        q.push({ i: i - 1, j })
        loop.push({ i: i - 1, j })
        if (ch == "S") {
          possible_s = possible_s.filter((cs) => "|JL".includes(cs))
        }
      }

      if (
        i < matrix.length - 1 &&
        "S|7F".includes(ch) &&
        "|JL".includes(matrix[i + 1][j]) &&
        not_seen(i + 1, j)
      ) {
        q.push({ i: i + 1, j })
        loop.push({ i: i + 1, j })
        if (ch == "S") {
          possible_s = possible_s.filter((cs) => "|7F".includes(cs))
        }
      }

      if (
        j > 0 &&
        "S-J7".includes(ch) &&
        "-LF".includes(matrix[i][j - 1]) &&
        not_seen(i, j - 1)
      ) {
        q.push({ i: i, j: j - 1 })
        loop.push({ i: i, j: j - 1 })
        if (ch == "S") {
          possible_s = possible_s.filter((cs) => "-J7".includes(cs))
        }
      }

      if (
        j < matrix[0].length - 1 &&
        "S-LF".includes(ch) &&
        "-J7".includes(matrix[i][j + 1]) &&
        not_seen(i, j + 1)
      ) {
        q.push({ i: i, j: j + 1 })
        loop.push({ i: i, j: j + 1 })
        if (ch == "S") {
          possible_s = possible_s.filter((cs) => "-LF".includes(cs))
        }
      }

      // console.log({ curr })
    }

    // console.log({ possible_s })

    matrix[start_i][start_j] = possible_s.pop()!

    // replace garbage pipes
    for (let i = 0; i < matrix.length; i++) {
      const row = matrix[i]
      for (let j = 0; j < row.length; j++) {
        if (!loop.some((c) => c.i == i && c.j == j)) {
          matrix[i][j] = "."
        }
      }
    }

    const outside = [] as coord[]

    for (let i = 0; i < matrix.length; i++) {
      const row = matrix[i]
      let within = false
      let up: undefined | boolean = undefined
      for (let j = 0; j < row.length; j++) {
        const ch = row[j]
        if (ch == "|") {
          // if (up) {
          //   throw new Error("Should not be up at this point")
          // }
          within = !within
        } else if (ch == "-") {
          // console.log({ up })
          // if (!up) {
          //   throw new Error("Should be up at this point")
          // }
        } else if ("LF".includes(ch)) {
          // if (!up) {
          //   throw new Error("Should not be up at L/F")
          // }
          up = ch == "L"
        } else if ("7J".includes(ch)) {
          // if(up) {
          //   throw new Error("Should not be up at 7J")
          // }
          if (isUndefined(up)) {
            throw new Error("Up should be defined here")
          }
          if (ch != (up === false ? "7" : "J")) {
            within = !within
          }
          up = undefined
        } else if (ch == ".") {
        } else {
          throw new Error(`Unexpected char: ${ch}`)
        }

        if (!within) {
          outside.push({ i, j })
        }
      }
    }

    matrix.map((line) => line.join("")).pipelog()

    // replace outside pipes
    for (let i = 0; i < matrix.length; i++) {
      const row = matrix[i]
      for (let j = 0; j < row.length; j++) {
        if (outside.some((c) => c.i == i && c.j == j)) {
          matrix[i][j] = "O"
        }
      }
    }
    matrix.map((line) => line.join("")).pipelog()

    return matrix.flat().filter((x) => x === ".").length
  }
}
