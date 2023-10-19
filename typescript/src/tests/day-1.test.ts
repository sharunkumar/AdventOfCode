import path from "path";
import { default as day1 } from "../solutions/day-01-calorie-counting-1";
import { default as day2 } from "../solutions/day-01-calorie-counting-2";
import { readFileSync } from "fs";

describe("day 1", () => {
  test("part 1", () => {
    let solution = new day1();
    const input_file_name = path.join(__dirname, "..", "..", "io", `${solution.constructor.name}.txt`);
    const input = readFileSync(input_file_name, "utf-8");
    let output = solution.solve(input);
    expect(output).toBe(71502);
  });
  test("part 2", () => {
    let solution = new day2();
    const input_file_name = path.join(__dirname, "..", "..", "io", `${solution.constructor.name}.txt`);
    const input = readFileSync(input_file_name, "utf-8");
    let output = solution.solve(input);
    expect(output).toBe(208191);
  });
});
