import { default as part1 } from "../solutions/day-04-camp-cleanup-1"
import { default as part2 } from "../solutions/day-04-camp-cleanup-2"
import { readFileSync } from "fs"

describe("Day 04: Camp Cleanup", () => {
  let input: string
  beforeAll(() => {
    const input_file_name = __filename
      .replace(/\.test\.ts$/, ".input.txt")
      .replace(/tests/, "tests/io")
    input = readFileSync(input_file_name, "utf-8")
  })
  test("part 1", () => {
    let output = new part1().solve(input)
    expect(output).toBe(2)
  })
  test("part 2", () => {
    let output = new part2().solve(input)
    expect(output).toBe(4)
  })
})
