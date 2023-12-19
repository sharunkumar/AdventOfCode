import { PrismaClient } from "@prisma/client"
import { Solution, numberc } from "../utils"
import { floor } from "lodash"

export default class PipeMaze extends Solution {
  async solve(input: string) {
    let start_i = 0
    let start_j = 0
    const matrix = this.get_lines(input)
      .map((line, idxi) =>
        line.split("").map((c, idxj) => {
          if (c == "S") {
            start_i = idxi
            start_j = idxj
          }
          return c
        }),
      )
      .pipelog()

    const prisma = new PrismaClient()

    await prisma.seenCoordinates.deleteMany()

    interface coord {
      i: number
      j: number
    }

    let q = [] as coord[]

    // console.log({ start_i, start_j })

    async function not_seen(i: number, j: number) {
      return (await prisma.seenCoordinates.count({ where: { i, j } })) == 0
    }

    q.push({ i: start_i, j: start_j })
    await prisma.seenCoordinates.create({ data: { i: start_i, j: start_j } })

    while (q.length) {
      const { i, j } = q.shift()!

      const ch = matrix[i][j]

      // console.log({ ch })

      if (
        i > 0 &&
        "S|JL".includes(ch) &&
        "|7F".includes(matrix[i - 1][j]) &&
        (await not_seen(i - 1, j))
      ) {
        await prisma.seenCoordinates.create({ data: { i: i - 1, j } })
        q.push({ i: i - 1, j })
      }

      if (
        i < matrix.length - 1 &&
        "S|7F".includes(ch) &&
        "|JL".includes(matrix[i + 1][j]) &&
        (await not_seen(i + 1, j))
      ) {
        await prisma.seenCoordinates.create({ data: { i: i + 1, j } })
        q.push({ i: i + 1, j })
      }

      if (
        j > 0 &&
        "S-J7".includes(ch) &&
        "-LF".includes(matrix[i][j - 1]) &&
        (await not_seen(i, j - 1))
      ) {
        await prisma.seenCoordinates.create({ data: { i, j: j - 1 } })
        q.push({ i: i, j: j - 1 })
      }

      if (
        j < matrix[0].length - 1 &&
        "S-LF".includes(ch) &&
        "-J7".includes(matrix[i][j + 1]) &&
        (await not_seen(i, j + 1))
      ) {
        await prisma.seenCoordinates.create({ data: { i, j: j + 1 } })
        q.push({ i: i, j: j + 1 })
      }

      // console.log({ curr })
    }

    return floor((await prisma.seenCoordinates.count()) / 2)
  }
}
