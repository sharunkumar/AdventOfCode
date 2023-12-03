import { Solution } from "../utils"

export default class Trebuchet extends Solution {
  solve(input: string) {
    let result = this.get_lines(input)
      .map((line) => {
        line = line
          .replace(/one/g, "one1one")
          .replace(/two/g, "two2two")
          .replace(/three/g, "three3three")
          .replace(/four/g, "four4four")
          .replace(/five/g, "five5five")
          .replace(/six/g, "six6six")
          .replace(/seven/g, "seven7seven")
          .replace(/eight/g, "eight8eight")
          .replace(/nine/g, "nine9nine")
          .replace(/\D/g, "")

        return line
          .split("")
          .map(Number)
          .filter((x) => !isNaN(x))
      })
      .map((arr) => {
        const n = arr.length
        return `${arr[0]}${arr[n - 1]}`
      })
      .map(Number)
      .sum()

    return result
  }
}
