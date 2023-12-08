import { default as part1 } from "../solutions/day-17-pyroclastic-flow-1"
import { default as part2 } from "../solutions/day-17-pyroclastic-flow-2"
import { readFileSync } from "fs"

describe("Day 17: Pyroclastic Flow", () => {
  let input: string
  beforeAll(() => {
    const input_file_name = __filename
      .replace(/\.test\.ts$/, ".input.txt")
      .replace(/tests/, "tests/io")
    input = readFileSync(input_file_name, "utf-8")
  })
  test("part 1", () => {
    let output = new part1().solve(input)
    expect(output.height).toBe(3085)
  })
  test("part 2", async () => {
    let output = await new part2().solve(input)
    expect(output.height).toBe(1535483870924)
  })
})
