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
  test.todo("part 2 - 6", async () => {
    expect(await new part2(6).solve(input_2)).toBe(16)
  })
  test.todo("part 2 - 10", async () => {
    expect(await new part2(10).solve(input_2)).toBe(50)
  })
  test.todo("part 2 - 50", async () => {
    expect(await new part2(50).solve(input_2)).toBe(1594)
  })
  test.todo("part 2 - 100", async () => {
    expect(await new part2(100).solve(input_2)).toBe(6536)
  })
  test.todo("part 2 - 500", async () => {
    expect(await new part2(500).solve(input_2)).toBe(167004)
  })
  test.todo("part 2 - 1000", async () => {
    expect(await new part2(1000).solve(input_2)).toBe(668697)
  })
  test.todo("part 2 - 5000", async () => {
    expect(await new part2(5000).solve(input_2)).toBe(16733044)
  })
  test.todo("part 2 - prod", async () => {
    expect(await new part2(26501365).solve(input_prod)).toBe(null)
  })
})
