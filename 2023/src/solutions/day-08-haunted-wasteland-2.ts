import { isEqual } from "lodash"
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
        .map((line) => regexMatch(line, /(\d|\w)+/g))
        .map(([a, b, c]) => [a, [b, c]] as [string, string[]]),
    )

    // console.log(map)

    const keys = Array.from(map.keys())

    let starts = keys.filter((key) => key[2] === "A")
    // const ends = keys.filter((key) => key[2] === "Z")

    // console.log({ starts, ends })

    while (condition(starts)) {
      const next = directions.next()

      starts = starts.map((s, idx) => map.get(s)![next])
      // console.log(directions.count)
    }

    return directions.count
  }
}

function condition(starts: string[]) {
  for (let index = 0; index < starts.length; index++) {
    const element = starts[index]
    if (element[2] !== "Z") return true
  }
  return false
}
