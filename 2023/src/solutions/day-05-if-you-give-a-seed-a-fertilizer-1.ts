import { Solution, regexMatch } from "../utils"

export default class IfYouGiveASeedAFertilizer extends Solution {
  solve(input: string) {
    const [seeds_data, ...rest] = this.get_blocks(input)

    // console.log({ seeds: seeds_data, rest })

    const seeds = regexMatch(seeds_data, /\d+/g).map(Number) //.pipelog()

    // console.log({ seeds, rest })

    const maps = rest
      .map(this.get_blocks)
      .map((block) => block.map(this.get_lines))
      .flat()
      .map(([first, ...eh]) => [first, eh.map((x) => regexMatch(x, /\d+/g).map(Number))].flat())

    console.log({ seeds, maps })

    return 0
  }
}
