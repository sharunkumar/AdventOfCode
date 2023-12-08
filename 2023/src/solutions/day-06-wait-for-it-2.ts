import { Solution, range, regexMatch } from "../utils"

export default class WaitForIt extends Solution {
  solve(input: string) {
    const [time, distance] = this.get_lines(input)
      .map((line) => regexMatch(line, /\d+/g).join(""))
      .map(Number)
    // .pipelog()

    return range(time).filter((hold) => {
      return hold * (time - hold) > distance
    }).length
  }
}
