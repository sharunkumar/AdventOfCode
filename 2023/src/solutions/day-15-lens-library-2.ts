import { Solution, numberc } from "../utils"
import { isEmpty } from "lodash"

export default class LensLibrary extends Solution {
  solve(input: string) {
    const boxes = new Array<[string, number][]>(256).fill([])

    const instructions = input
      .split(",")
      .map((ins) => ins.split(/[=-]/))
      .map(
        ([first, second]) =>
          [first, second == "" ? NaN : numberc(second)] as [string, number],
      )
      .map(
        ([first, second]) =>
          [HASH(first), first, second] as [number, string, number],
      )
      .forEach(([hash, label, power]) => {
        if (isNaN(power)) {
          // remove
          if (!isEmpty(boxes[hash])) {
            boxes[hash] = boxes[hash].filter((x) => x[0] !== label)
          }
        } else {
          // add/update
          if (isEmpty(boxes[hash])) {
            boxes[hash] = [[label, power]]
          } else {
            if (boxes[hash].filter((x) => x[0] == label).length) {
              // update
              boxes[hash] = boxes[hash].map((x) =>
                x[0] == label ? [label, power] : x,
              )
            } else {
              boxes[hash].push([label, power])
            }
          }
        }
      })

    return boxes
      .map((arr, idx) => {
        return arr.length == 0
          ? 0
          : (idx + 1) * arr.map((elem, idy) => (idy + 1) * elem[1]).sum()
      })
      .sum()
  }
}

function HASH(inp: string): number {
  return inp
    .split("")
    .map((c) => c.charCodeAt(0))
    .reduce((previous, current) => {
      return ((previous + current) * 17) % 256
    }, 0)
}
