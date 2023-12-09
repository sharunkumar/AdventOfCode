import { Solution, numberc } from "../utils"

export default class MonkeyMath extends Solution {
  solve(input: string) {
    const tokens = new Map<string, number | [string, string, string]>(this.get_lines(input)
      .map(line => line.split(": "))
      .map(([t, x]) => [t, numberc(x)])
      .map(([t, x]) => {
        if (typeof x == "number")
          return [t, x] as [string, number]
        else {
          const result = [t, x.split(" ")] as [string, [string, string, string]]
          if (result[0] == "root") {
            result[1][1] = "="
          }
          return result
        }
      }))

    console.log(tokens)

    function compute(root: string) {
      if (root == "humn") {
        return "x"
      }
      const val = tokens.get(root)!
      if (typeof val == "number") return val
      else {
        const [left, op, right] = val
        return `(${compute(left)} ${op} ${compute(right)})`
      }
    }

    return compute("root")

    // .pipelog()
  }
}
