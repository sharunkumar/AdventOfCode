import { Solution, numberc, safe_get } from "../utils"

export default class GearRatios extends Solution {
  solve(input: string) {
    const lines = this.get_lines(input)
    const matrix = lines.map((line) => (line + ".").split("")).pipelog()
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
          if (numbuf.length == 0) continue
          // check if number has symbol neigbors
          console.log(numbuf)
          let finds: (string | undefined)[] = []
          for (let l = 1; l <= numbuf.length; l++) {
            let k = j - l
            finds.push(
              ...neigbors
                .map(([a, b]) => [i + a, k + b])
                .map(([c, d]) => safe_get(matrix, c, d))
                .filter((x) => x && x !== "." && isNaN(Number(x))),
            )
          }
          finds.pipelog()
          if (finds.length > 0) {
            sum += Number(numbuf)
          }

          numbuf = ""
        }
      }
    }

    return sum
  }
}
