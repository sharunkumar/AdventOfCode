import { Solution, numberc, safe_get } from "../utils"

export default class GearRatios extends Solution {
  solve(input: string) {
    const lines = this.get_lines(input)
    const matrix = lines.map((line) => line.split("")).pipelog()
    // lines.map((line) => line.split(".").map((x) => (isNaN(Number(x)) ? x : Number(x)))).pipelog()

    let sum = 0

    let neigbors = [
      [1, 0],
      [-1, 0],
      [0, 1],
      [0, -1],
      [1, 1],
      [1, -1],
      [-1, 1],
      [-1, -1],
    ]

    for (let i = 0; i < matrix.length; i++) {
      const row = matrix[i]
      let numbuf = ""
      for (let j = 0; j < row.length; j++) {
        const c = numberc(row[j])
        if (typeof c == "number") {
          numbuf += c.toString()
          // console.log(numbuf)
        } else {
          // check if number has symbol neigbors
          if (numbuf.length == 0) continue
          console.log(numbuf)
          for (let l = 1; l <= numbuf.length; l++) {
            let k = j - l
            let finds = neigbors
              .map(([a, b]) => safe_get(matrix, i + a, k + b))
              .filter((x) => x && x !== "." && isNaN(Number(x)))
              .pipelog()

            if (finds.length > 0) {
              sum += Number(numbuf)
              numbuf = ""
              break
            }
          }

          numbuf = ""
        }
      }
    }

    return sum
  }
}
