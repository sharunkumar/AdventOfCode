import { default as part1 } from "../solutions/day-02-rock-paper-scissors-1";
import { default as part2 } from "../solutions/day-02-rock-paper-scissors-2";
import { readFileSync } from "fs";

describe("Day 02: Rock Paper Scissors", () => {
  let input: string;
  beforeAll(() => {
    const input_file_name = __filename.replace(/\.test\.ts$/, ".input.txt").replace(/tests/, "tests/io");
    input = readFileSync(input_file_name, "utf-8");
  });
  test("part 1", () => {
    let output = new part1().solve(input);
    expect(output).toBe(15);
  });
  test("part 2", () => {
    let output = new part2().solve(input);
    expect(output).toBe(12);
  });
});
