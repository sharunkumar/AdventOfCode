import { default as part1 } from "../solutions/day-20-pulse-propagation-1"
import { default as part2 } from "../solutions/day-20-pulse-propagation-2"
import { readFileSync } from "fs"

describe("Day 20: Pulse Propagation", () => {
  let input_1_1: string
  let input_1_2: string
  let input_prod: string
  let input_2: string
  beforeAll(() => {
    const input_file_name_1_1 = __filename
      .replace(/\.test\.ts$/, ".input.1-1.txt")
      .replace(/tests/, "tests/io")
    const input_file_name_1_2 = __filename
      .replace(/\.test\.ts$/, ".input.1-2.txt")
      .replace(/tests/, "tests/io")
    const input_file_name_2 = __filename
      .replace(/\.test\.ts$/, ".input.2.txt")
      .replace(/tests/, "tests/io")
    input_1_1 = readFileSync(input_file_name_1_1, "utf-8")
    input_1_2 = readFileSync(input_file_name_1_2, "utf-8")
    input_2 = readFileSync(input_file_name_2, "utf-8")
    input_prod = readFileSync(`io/${new part1().constructor.name}.txt`, "utf-8")
  })
  test("part 1 - 1", async () => {
    let output = await new part1().solve(input_1_1)
    expect(output).toBe(32000000)
  })
  test("part 1 - 2", async () => {
    let output = await new part1().solve(input_1_2)
    expect(output).toBe(11687500)
  })
  test("part 1 - prod", async () => {
    let output = await new part1().solve(input_prod)
    expect(output).toBe(807069600)
  })
  test("part 2 - prod", async () => {
    let output = await new part2().solve(input_prod)
    expect(output).toBe(221453937522197)
  })
})
