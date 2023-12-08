import { Solution, regexMatch } from "../utils"

export default class IfYouGiveASeedAFertilizer extends Solution {
  solve(input: string) {
    const [seeds_data, ...rest] = this.get_blocks(input)

    const seeds = regexMatch(seeds_data, /\d+/g).map(Number) //.pipelog()

    let seeds2 = [] as [number, number][]

    const maps = rest
      .map(this.get_blocks)
      .map((block) => block.map(this.get_lines))
      .flat()
      .map(([_first, ...eh]) =>
        [eh.map((x) => regexMatch(x, /\d+/g).map(Number))].flat(),
      )

    for (let i = 0; i < seeds.length; i += 2) {
      seeds2.push([seeds[i], seeds[i] + seeds[i + 1]])
    }

    maps.forEach((ranges) => {
      let running = [] as [number, number][]
      while (seeds2.length) {
        const next = seeds2.pop()
        if (!next) break
        const [start, end] = next
        let found = false
        for (let r = 0; r < ranges.length; r++) {
          const [dest, src, range] = ranges[r]

          let overlap_start = Math.max(start, src)
          let overlap_end = Math.min(end, src + range)
          if (overlap_start < overlap_end) {
            running.push([overlap_start - src + dest, overlap_end - src + dest])
            if (overlap_start > start) {
              seeds2.push([start, overlap_start])
            }
            if (end > overlap_end) {
              seeds2.push([overlap_end, end])
            }
            found = true
            break
          }
        }
        if (!found) {
          running.push([start, end])
        }
      }
      seeds2 = running
    })

    return seeds2.map((x) => x[0]).least()
  }
}
