import { default as part1 } from "../solutions/day-11-cosmic-expansion-1"
import { default as part2 } from "../solutions/day-11-cosmic-expansion-2"
import { readFileSync } from "fs"

describe("Day 11: Cosmic Expansion", () => {
  let input_1: string
  let input_prod: string
  let input_2: string
  let input_2_10: string
  let input_2_100: string
  beforeAll(() => {
    const input_file_name_1 = __filename
      .replace(/\.test\.ts$/, ".input.1.txt")
      .replace(/tests/, "tests/io")
    const input_file_name_2 = __filename
      .replace(/\.test\.ts$/, ".input.2.txt")
      .replace(/tests/, "tests/io")
    const input_file_name_2_10 = __filename
      .replace(/\.test\.ts$/, ".input.2-10.txt")
      .replace(/tests/, "tests/io")
    const input_file_name_2_100 = __filename
      .replace(/\.test\.ts$/, ".input.2-100.txt")
      .replace(/tests/, "tests/io")
    input_1 = readFileSync(input_file_name_1, "utf-8")
    input_2 = readFileSync(input_file_name_2, "utf-8")
    input_2_10 = readFileSync(input_file_name_2_10, "utf-8")
    input_2_100 = readFileSync(input_file_name_2_100, "utf-8")
    input_prod = readFileSync(`io/${new part1().constructor.name}.txt`, "utf-8")
  })
  test("part 1", async () => {
    let output = await new part1().solve(input_1)
    expect(output).toBe(374)
  })
  test("part 1 - prod", async () => {
    let output = await new part1().solve(input_prod)
    expect(output).toBe(10422930)
  })
  test("part 2", async () => {
    let output = await new part2().solve(input_2)
    expect(output).toBe(374)
  })
  test("part 2 - 10", async () => {
    let output = await new part2().solve(input_2_10)
    expect(output).toBe(1030)
  })
  test("part 2 - 100", async () => {
    let output = await new part2().solve(input_2_100)
    expect(output).toBe(8410)
  })
  test("part 2 - prod", async () => {
    let output = await new part2().solve(input_prod)
    expect(output).toBe(699909023130)
  })
})
