import { countBy, sortBy } from "lodash"
import { Solution } from "../utils"

export default class CamelCards extends Solution {
  solve(input: string) {
    // console.log({ input })

    const lets = new Map([
      ["T", "A"],
      ["J", "B"],
      ["Q", "C"],
      ["K", "D"],
      ["A", "E"],
    ])

    const data = this.get_lines(input)
      .map((line) => line.split(" "))
      .map(([first, second]) => {
        return {
          cards: first,
          bid: Number(second),
        }
      })
      .map((c) => {
        return {
          ...c,
          counts: countBy(
            c.cards,
            (s) => Array.from(c.cards).filter((a) => a == s).length,
          ),
        }
      })
      .map((c) => {
        return {
          ...c,
          classification: (() => {
            if (c.counts["5"]) return 6
            if (c.counts["4"]) return 4
            if (c.counts["3"]) {
              if (c.counts["2"]) return 4
              return 3
            }
            if (c.counts["2"] === 4) return 2
            if (c.counts[2]) return 1
            return 0
          })(),
          strength: Array.from(c.cards)
            .map((char) => lets.get(char) || char)
            .join(""),
        }
      })
    // .pipelog()

    return sortBy(data, ["classification", "strength"])
      .map((c, idx) => c.bid * (idx + 1))
      .sum()
  }
}
