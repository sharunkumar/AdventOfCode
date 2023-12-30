import { default as part1 } from "../solutions/day-21-step-counter-1"
import { default as part2 } from "../solutions/day-21-step-counter-2"
import { readFileSync } from "fs"

describe("Day 21: Step Counter", () => {
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
    input_prod = readFileSync(
      `io/${new part1(0).constructor.name}.txt`,
      "utf-8",
    )
  })
  test("part 1", async () => {
    expect(await new part1(6).solve(input_1)).toBe(16)
  })
  test("part 1 - prod", async () => {
    expect(await new part1(64).solve(input_prod)).toBe(3709)
  })
  test("part 2 - prod", async () => {
    expect(await new part2(26501365).solve(input_prod)).toBe(617361073602319)
  })
})
