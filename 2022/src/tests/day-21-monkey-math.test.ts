import { default as part1 } from "../solutions/day-21-monkey-math-1"
import { default as part2 } from "../solutions/day-21-monkey-math-2"
import { readFileSync } from "fs"

describe("Day 21: Monkey Math", () => {
  let input_1: string
  let input_prod: string
  let input_2: string
  beforeAll(() => {
    const input_file_name_1 = __filename
      .replace(/\.test\.ts$/, ".input.1.txt")
      .replace(/tests/, "tests/io")
    const input_file_name_2 = __filename
      .replace(/\.test\.ts$/, ".input.2.txt")
      .replace(/tests/, "tests/io")
    input_1 = readFileSync(input_file_name_1, "utf-8")
    input_2 = readFileSync(input_file_name_2, "utf-8")
    input_prod = readFileSync(`io/${new part1().constructor.name}.txt`, "utf-8")
  })
  test("part 1", () => {
    let output = new part1().solve(input_1)
    expect(output).toBe(152)
  })
  test("part 1 - prod", () => {
    let output = new part1().solve(input_prod)
    expect(output).toBe(51928383302238)
  })
  test("part 2", () => {
    let output = new part2().solve(input_2)
    expect(output).toBe(301)
  })
  test("part 2 - prod", () => {
    let output = new part2().solve(input_prod)
    expect(output).toBe(3305669217840)
  })
})
