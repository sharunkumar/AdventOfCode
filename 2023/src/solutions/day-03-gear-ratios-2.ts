import { PrismaClient } from "@prisma/client"
import { Solution, numberc, safe_get } from "../utils"

const prisma = new PrismaClient()

export default class GearRatios extends Solution {
  async solve(input: string) {
    await prisma.gearCoordinates.deleteMany()
    const lines = this.get_lines(input)
    const matrix = lines.map((line) => (line + ".").split(""))

    for (let i = 0; i < matrix.length; i++) {
      const row = matrix[i]
      let numbuf = ""
      let start_x = 0,
        start_y = 0
      for (let j = 0; j < row.length; j++) {
        const c = numberc(row[j])
        if (typeof c == "number") {
          if (numbuf.length == 0) {
            start_x = i
            start_y = j
          }
          numbuf += c.toString()
        } else {
          if (numbuf.length == 0) continue
          let finds: ReturnType<typeof getNeightbors> = []
          for (let l = 1; l <= numbuf.length; l++) {
            let k = j - l
            finds.push(...getNeightbors(i, k, matrix))
          }
          if (finds.length > 0) {
            const num = Number(numbuf)
            for (let f = 0; f < finds.length; f++) {
              const find = finds[f]
              await prisma.gearCoordinates
                .create({
                  data: {
                    i: find.x,
                    j: find.y,
                    part_i: start_x,
                    part_j: start_y,
                    part_num: num,
                  },
                })
                .catch((err) => 0)
            }
          }

          numbuf = ""
        }
      }
    }

    const gears = await prisma.gearCoordinates.groupBy({
      by: ["i", "j"],
      having: {
        part_num: {
          _count: {
            equals: 2,
          },
        },
      },
    })

    let sum = 0

    for (let gi = 0; gi < gears.length; gi++) {
      const g = gears[gi]
      sum += (
        await prisma.gearCoordinates.findMany({
          where: {
            i: g.i,
            j: g.j,
          },
          select: {
            part_num: true,
          },
        })
      )
        .map((g) => g.part_num)
        .product()
    }

    return sum
  }
}

const neigbors = [
  [1, 0],
  [-1, 0],
  [0, 1],
  [0, -1],
  [1, 1],
  [1, -1],
  [-1, 1],
  [-1, -1],
]

function updatePart(start_x: number, start_y: number, num: number) {
  return
}

function getNeightbors(i: number, k: number, matrix: string[][]) {
  return neigbors
    .map(([a, b]) => [i + a, k + b])
    .map(([c, d]) => {
      const result = {
        code: safe_get(matrix, c, d),
        x: c,
        y: d,
      }
      return result
    })
    .filter(({ code }) => code && code === "*" && isNaN(Number(code)))
}
