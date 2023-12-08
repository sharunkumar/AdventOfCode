import { Solution, lcm, regexMatch } from "../utils"
import { LoopingIterator } from "../utils/iterator"

export default class HauntedWasteland extends Solution {
  solve(input: string) {
    const [first, second] = this.get_blocks(input) //.pipelog()

    const map = new Map<string, string[]>(
      this.get_lines(second)
        .map((line) => regexMatch(line, /(\d|\w)+/g))
        .map(([a, b, c]) => [a, [b, c]] as [string, string[]]),
    )

    const keys = Array.from(map.keys())

    let starts = keys.filter((key) => key[2] === "A")

    let zees = starts.map((start) => {
      const directions = new LoopingIterator(
        first.split("").map((lr) => (lr == "L" ? 0 : 1)),
      )

      let running = start

      while (true) {
        running = map.get(running)![directions.next()]

        if (running.endsWith("Z")) {
          return directions.count
        }
      }
    })

    let num = zees.pop()!

    while (zees.length) {
      num = lcm(num, zees.pop()!)
    }

    return num
  }
}
