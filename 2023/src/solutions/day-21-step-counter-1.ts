import { Solution, inclusive_between as ibw, numberc } from "../utils"

interface coord {
  i: number
  j: number
}

function directions(c: coord): [coord, coord, coord, coord] {
  return [
    { i: c.i - 1, j: c.j }, // N
    { i: c.i + 1, j: c.j }, // S
    { i: c.i, j: c.j + 1 }, // E
    { i: c.i, j: c.j - 1 }, // W
  ]
}

export default class StepCounter extends Solution {
  solve(input: string) {
    const [inp, steps] = this.get_blocks(input).map(numberc) as [string, number]

    const map = this.get_matrix(inp)

    let start: coord = { i: 0, j: 0 }

    map.forEach((row, r) =>
      row.forEach((char, c) => {
        if (char === "S") {
          start.i = r
          start.j = c
        }
      }),
    )

    const ans = new Set<string>()
    const seen = new Set<string>()

    const key = (c: coord): string => `${c.i}#${c.j}`
    const add = (c: coord) => ans.add(key(c))
    const see = (c: coord) => seen.add(key(c))
    const inbound = (c: coord): boolean =>
      ibw(c.i, 0, map.length) && ibw(c.j, 0, map[0].length)

    const q = new Array<[coord, number]>(1).fill([start, steps])

    while (q.length) {
      const [curr, step] = q.shift()!

      if (step % 2 == 0) add(curr)
      if (step === 0) continue

      for (const next of directions(curr)) {
        const { i: nr, j: nc } = next
        if (
          nr < 0 ||
          nr >= map.length ||
          nc < 0 ||
          nc >= map[0].length ||
          map[nr][nc] == "#" ||
          seen.has(key(next))
        )
          continue
        see(next)
        q.push([next, step - 1])
      }
    }

    return ans.size
  }
}
