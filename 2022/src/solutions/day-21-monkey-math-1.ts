import { Solution, numberc } from "../utils"

export default class MonkeyMath extends Solution {
  solve(input: string) {
    const tokens = new Map<string, number | [string, string, string]>(this.get_lines(input)
      .map(line => line.split(": "))
      .map(([t, x]) => [t, numberc(x)])
      .map(([t, x]) => {
        if (typeof x == "number")
          return [t, x] as [string, number]
        else
          return [t, x.split(" ")] as [string, [string, string, string]]
      }))

    // console.log(tokens)

    function compute(root: string) {
      const val = tokens.get(root)!
      if (typeof val == "number") return val
      else {
        const [left, op, right] = val
        switch (op) {
          case "+": return compute(left) + compute(right)
          case "-": return compute(left) - compute(right)
          case "/": return compute(left) / compute(right)
          case "*": return compute(left) * compute(right)
        }
      }
    }

    return compute("root")

    // .pipelog()
  }
}
