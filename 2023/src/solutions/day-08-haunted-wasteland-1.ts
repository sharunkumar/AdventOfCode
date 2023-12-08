import { Solution, regexMatch } from "../utils"
import { LoopingIterator } from "../utils/iterator"

export default class HauntedWasteland extends Solution {
  solve(input: string) {
    const [first, second] = this.get_blocks(input) //.pipelog()

    const directions = new LoopingIterator(
      first.split("").map((lr) => (lr == "L" ? 0 : 1)),
    )

    // console.log({ directions })

    const map = new Map<string, string[]>(
      this.get_lines(second)
        .map((line) => regexMatch(line, /\w+/g))
        .map(([a, b, c]) => [a, [b, c]] as [string, string[]]),
    )

    // console.log(map)

    let running = "AAA"
    let steps = 0
    let i = 0

    while (running !== "ZZZ") {
      running = map.get(running)![directions.next()]
      steps++
    }

    return steps
  }
}
