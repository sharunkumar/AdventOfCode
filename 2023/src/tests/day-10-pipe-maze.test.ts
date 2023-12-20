import { default as part1 } from "../solutions/day-10-pipe-maze-1"
import { default as part2 } from "../solutions/day-10-pipe-maze-2"
import { readFileSync } from "fs"

describe("Day 10: Pipe Maze", () => {
  let input_1: string
  let input_prod: string
  let input_2_1: string
  let input_2_2: string
  let input_2_3: string
  beforeAll(() => {
    const input_file_name_1 = __filename
      .replace(/\.test\.ts$/, ".input.1.txt")
      .replace(/tests/, "tests/io")
    const input_file_name_2_1 = __filename
      .replace(/\.test\.ts$/, ".input.2-1.txt")
      .replace(/tests/, "tests/io")
    const input_file_name_2_2 = __filename
      .replace(/\.test\.ts$/, ".input.2-2.txt")
      .replace(/tests/, "tests/io")
    const input_file_name_2_3 = __filename
      .replace(/\.test\.ts$/, ".input.2-3.txt")
      .replace(/tests/, "tests/io")
    input_1 = readFileSync(input_file_name_1, "utf-8")
    input_2_1 = readFileSync(input_file_name_2_1, "utf-8")
    input_2_2 = readFileSync(input_file_name_2_2, "utf-8")
    input_2_3 = readFileSync(input_file_name_2_3, "utf-8")
    input_prod = readFileSync(`io/${new part1().constructor.name}.txt`, "utf-8")
  })
  test("part 1", async () => {
    let output = await new part1().solve(input_1)
    expect(output).toBe(4)
  })
  test("part 1 - prod", async () => {
    let output = await new part1().solve(input_prod)
    expect(output).toBe(7107)
  })
  test("part 2 - 1", async () => {
    let output = await new part2().solve(input_2_1)
    expect(output).toBe(4)
  })
  test("part 2 - 2", async () => {
    let output = await new part2().solve(input_2_2)
    expect(output).toBe(8)
  })
  test("part 2 - 3", async () => {
    let output = await new part2().solve(input_2_3)
    expect(output).toBe(10)
  })
  test("part 2 - prod", () => {
    let output = new part2().solve(input_prod)
    expect(output).toBe(null)
  })
})
