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

    function compute(root: string): number {
      // if (root == "humn") {
      //   return "x"
      // }
      const val = tokens.get(root)!
      if (typeof val == "number") return val
      else {
        const [left, op, right] = val
        return eval(`(${compute(left)} ${op} ${compute(right)})`)
      }
    }

    const rhs = compute(tokens.get("root")![2])

    // console.log({ rhs })

    function traverse(root: string) {
      if (root == "humn") {
        return "x"
      } else {
        const result = tokens.get(root)!
        if (typeof result == "number") return result
        else {
          return fix(result)
        }
      }

      function fix(result: [string, string, string]) {
        const x = traverse(result[0])
        const op = result[1]
        const y = traverse(result[2])
        return typeof y == "number" ? [x, op, y] : [y, op, x]
      }
    }

    const expr = traverse(tokens.get("root")![0])

    // console.log({ expr })

    function construct(arr: any[]): expression {
      if (arr[0] == "x") {
        return {
          left: "x",
          op: arr[1],
          right: arr[2],
        }
      } else {
        return {
          left: construct(arr[0]),
          op: arr[1],
          right: arr[2],
        }
      }
    }

    const final = construct(expr)
    // console.log(final)

    return invert(final, rhs)
  }
}
