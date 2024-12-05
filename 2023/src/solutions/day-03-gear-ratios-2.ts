import { Solution, numberc, safe_get } from "../utils"

export default class GearRatios extends Solution {
  solve(input: string) {
    const lines = this.get_lines(input)
    const matrix = lines.map((line) => (line + ".").split(""))

    // Map to store gear coordinates and their adjacent numbers
    const gearMap = new Map<string, number[]>()

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

          let finds = new Set<string>()
          for (let l = 1; l <= numbuf.length; l++) {
            let k = j - l
            getNeightbors(i, k, matrix).forEach(({ x, y }) => {
              finds.add(`${x},${y}`)
            })
          }

          const num = Number(numbuf)
          finds.forEach((coord) => {
            if (!gearMap.has(coord)) {
              gearMap.set(coord, [])
            }
            gearMap.get(coord)?.push(num)
          })

          numbuf = ""
        }
      }
    }

    // Calculate sum of gear ratios
    let sum = 0
    gearMap.forEach((numbers) => {
      if (numbers.length === 2) {
        sum += numbers[0] * numbers[1]
      }
    })

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
