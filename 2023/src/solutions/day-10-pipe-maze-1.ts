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
      i: Number
      j: Number
    }

    let q = [] as coord[]

    console.log({ start_i, start_j })

    return floor((await prisma.seenCoordinates.count()) / 2)
  }
}
