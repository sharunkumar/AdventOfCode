import { Solution, range, regexMatch } from "../utils"

export default class WaitForIt extends Solution {
  solve(input: string) {
    const [times, distances] = this.get_lines(input).map((line) =>
      regexMatch(line, /\d+/g).map(Number),
    )
    // .pipelog()

    const races = times.map((t, idx) => [t, distances[idx]]) //.pipelog()

    const wins = races.map(([time, distance]) => {
      return range(time).filter((hold) => {
        return hold * (time - hold) > distance
      }).length
    })

    return wins.product()
  }
}
