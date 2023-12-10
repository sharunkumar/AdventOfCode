import { Solution, numberc } from "../utils"

interface expression {
  left: "x" | expression
  op: "+" | "-" | "*" | "/"
  right: number
}

function invert(x: expression, rhs: number): expression | number {
  if (x.left == "x") {
    return apply(x, rhs)
  } else {
    return invert(x.left, apply(x, rhs))
  }
}

function apply(x: expression, rhs: number) {
  switch (x.op) {
    case "*":
      return rhs / x.right
    case "/":
      return rhs * x.right
    case "+":
      return rhs - x.right
    case "-":
      return rhs + x.right
  }
}

export default class MonkeyMath extends Solution {
  solve(input: string) {
    const tokens = new Map<string, number | [string, string, string]>(
      this.get_lines(input)
        .map((line) => line.split(": "))
        .map(([t, x]) => [t, numberc(x)])
        .map(([t, x]) => {
          if (typeof x == "number") return [t, x] as [string, number]
          else {
            const result = [t, x.split(" ")] as [
              string,
              [string, string, string],
            ]
            if (result[0] == "root") {
              result[1][1] = "="
            }
            return result
          }
        }),
    )

    // console.log(tokens)

    function compute(root: string): string {
      const val = tokens.get(root)!
      if (typeof val == "number") return val.toString()
      else {
        const [left, op, right] = val
        return `(${compute(left)} ${op} ${compute(right)})`
      }
    }

    const lhs: string = tokens.get("root")![0]
    const rhs: string = tokens.get("root")![2]

    // nuclear approach
    let running = 0,
      low = 0,
      high = 10_000_000_000_000,
      left = -Infinity,
      right = eval(compute(rhs))

    while (left !== right) {
      running = Math.floor((low + high) / 2)
      tokens.set("humn", running)
      left = eval(compute(lhs))

      if (left < right) {
        low = running
      } else {
        high = running
      }
    }

    return running
  }
}
