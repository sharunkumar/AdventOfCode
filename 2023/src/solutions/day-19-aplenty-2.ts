import { max, min } from "lodash"
import { Solution, numberc, regexMatch } from "../utils"

class range {
  constructor(public lo = 1, public hi = 4000) {}
}

class xmas {
  constructor(
    public x = new range(),
    public m = new range(),
    public a = new range(),
    public s = new range(),
    public stage = "in",
  ) {}
}

function product(item: xmas) {
  return (
    (item.x.hi - item.x.lo + 1) *
    (item.m.hi - item.m.lo + 1) *
    (item.a.hi - item.a.lo + 1) *
    (item.s.hi - item.s.lo + 1)
  )
}

function split(r: range, cmp: string, num: number): [range, range] {
  const trange = new range(r.lo, r.hi)
  const frange = new range(r.lo, r.hi)

  if (cmp == "<") {
    trange.hi = num - 1
    frange.lo = num
  } else {
    trange.lo = num + 1
    frange.hi = num
  }

  return [trange, frange]
}

export default class Aplenty extends Solution {
  solve(input: string) {
    const [first, _] = this.get_blocks(input)

    const pipelines = new Map(
      this.get_lines(first)
        .map((line) => line.replaceAll("}", "").split("{"))
        .map(([name, spec]) => [name, spec.split(",")]),
    )

    pipelines.set("A", ["A"])
    pipelines.set("R", ["R"])

    console.log(pipelines)

    function progress(item: xmas): xmas[] {
      // console.log({ item })
      const result = [] as xmas[]

      const spec = pipelines.get(item.stage)!

      // console.log({ spec })

      for (let i = 0; i < spec.length; i++) {
        const s = spec[i]
        if (!s.includes(":")) {
          if (s == "A") {
            result.push(new xmas(item.x, item.m, item.a, item.s, s))
          } else if (s == "R") {
            // reject
          } else {
            // fallback
            result.push(
              ...progress(new xmas(item.x, item.m, item.a, item.s, s)),
            )
          }
        } else {
          const [char, cmp, ...rest] = s

          const [num, next] = rest.join("").split(":").map(numberc) as [
            number,
            string,
          ]

          // console.log({ char, cmp, num, next })

          const t = new xmas(item.x, item.m, item.a, item.s, item.stage)
          const f = new xmas(item.x, item.m, item.a, item.s, item.stage)

          const r = item[char] as range

          const [trange, frange] = split(r, cmp, num)

          t[char] = trange
          t.stage = next

          result.push(...progress(t))

          f[char] = frange
          item = f
        }
      }

      // console.log({ result })
      return result
    }

    return progress(new xmas()).map(product).sum()
  }
}
