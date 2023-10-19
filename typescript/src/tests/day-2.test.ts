import path from "path";
import { default as day1 } from "../solutions/day-02-rock-paper-scissors-1";
import { default as day2 } from "../solutions/day-02-rock-paper-scissors-2";
import { readFileSync } from "fs";

describe("day 2", () => {
  test("part 1", () => {
    let solution = new day1();
    const input_file_name = path.join(__dirname, "..", "..", "io", `${solution.constructor.name}.txt`);
    const input = readFileSync(input_file_name, "utf-8");
    let output = solution.solve(input);
    expect(output).toBe(12458);
  });
  test("part 2", () => {
    let solution = new day2();
    const input_file_name = path.join(__dirname, "..", "..", "io", `${solution.constructor.name}.txt`);
    const input = readFileSync(input_file_name, "utf-8");
    let output = solution.solve(input);
    expect(output).toBe(12683);
  });
});
