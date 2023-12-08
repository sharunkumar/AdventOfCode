import { Solution, range, regexMatch } from "../utils"

export default class WaitForIt extends Solution {
  solve(input: string) {
    const [times, distances] = this.get_lines(input).map((line) => regexMatch(line, /\d+/g).map(Number))
    // .pipelog()

    const races = times.map((t, idx) => [t, distances[idx]]) //.pipelog()

    const wins = races.map(([time, distance]) => {
      let result = 0

      range(time).forEach((hold) => {
        if (hold * (time - hold) > distance) {
          result += 1
        }
      })

      return result
    })

    return wins.product()
  }
}
