import path from "path";
import { default as day1 } from "../solutions/day-03-rucksack-reorganization-1";
import { default as day2 } from "../solutions/day-03-rucksack-reorganization-2";
import { readFileSync } from "fs";

describe("day 3", () => {
  let input: string;
  beforeAll(() => {
    const input_file_name = __filename.replace(/\.test\.ts$/, ".input.txt").replace(/tests/, "tests/io");
    input = readFileSync(input_file_name, "utf-8");
  });
  test("part 1", () => {
    let output = new day1().solve(input);
    expect(output).toBe(157);
  });
  test("part 2", () => {
    let output = new day2().solve(input);
    expect(output).toBe(70);
  });
});
