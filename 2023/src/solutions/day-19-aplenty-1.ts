import { Solution, regexMatch } from "../utils"

interface xmas {
  x: number
  m: number
  a: number
  s: number
}

export default class Aplenty extends Solution {
  solve(input: string) {
    const [first, second] = this.get_blocks(input)

    const parts = this.get_lines(second)
      .map((line) => regexMatch(line, /\d+/g).map(Number))
      .map((n): xmas => {
        return {
          x: n[0],
          m: n[1],
          a: n[2],
          s: n[3],
        }
      })
    // .pipelog()

    const pipelines = new Map(
      this.get_lines(first)
        .map((line) => line.replaceAll("}", "").split("{"))
        .map(([name, spec]) => [name, spec.split(",")]),
    )

    pipelines.set("A", ["A"])
    pipelines.set("R", ["R"])

    // console.log(pipelines)

    function apply(spec: string[], item: xmas): string {
      // console.log({ spec })
      for (let i = 0; i < spec.length; i++) {
        const curr = spec[i]
        // console.log({ curr })
        if (!curr.includes(":")) {
          if ("AR".includes(curr)) {
            return curr
          } else {
            return apply(pipelines.get(curr)!, item)
          }
        } else {
          let [cond, dest] = curr.split(":")

          cond = cond
            .replaceAll("x", `${item.x}`)
            .replaceAll("m", `${item.m}`)
            .replaceAll("a", `${item.a}`)
            .replaceAll("s", `${item.s}`)

          const result = eval(cond)
          // console.log({ cond, result })
          if (result == true) {
            return apply(pipelines.get(dest)!, item)
          }
        }
      }
      throw new Error("this should not reach")
    }

    return parts
      .map(
        (part) => [part, apply(pipelines.get("in")!, part)] as [xmas, string],
      )
      .filter((x) => x[1] == "A")
      .map(([p, _]) => p.x + p.m + p.a + p.s)
      .sum()
  }
}
