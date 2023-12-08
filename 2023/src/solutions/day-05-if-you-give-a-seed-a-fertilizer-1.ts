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
      .map(([_first, ...eh]) =>
        [eh.map((x) => regexMatch(x, /\d+/g).map(Number))].flat(),
      )

    // console.log({ seeds, maps })

    const result = seeds
      // .slice(0, 1)
      .map((seed) => {
        // console.log(seed)

        let running = seed

        for (let mi = 0; mi < maps.length; mi++) {
          const m = maps[mi]

          running =
            m
              .filter(
                ([dest, src, range]) =>
                  running >= src && running <= src + range,
              )
              .map(([dest, src, range]) => {
                // console.log([dest, src, range])
                return dest + (running - src)
              })[0] || running

          // console.log({ running })
        }
        return running
      })
      .least()

    return result
  }
}
