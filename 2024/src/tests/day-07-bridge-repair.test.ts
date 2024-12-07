import { default as part1 } from "#/solutions/day-07-bridge-repair-1";
import { default as part2 } from "#/solutions/day-07-bridge-repair-2";
import { readFileSync } from "node:fs";
import { describe, test, beforeAll, expect } from "bun:test";

describe("Day 07: Bridge Repair", () => {
  let input_1: string;
  let input_prod: string;
  let input_2: string;
  beforeAll(() => {
    const input_file_name_1 = __filename
      .replace(/\.test\.ts$/, ".input.1.txt")
      .replace(/tests/, "tests/io");
    const input_file_name_2 = __filename
      .replace(/\.test\.ts$/, ".input.2.txt")
      .replace(/tests/, "tests/io");
    input_1 = readFileSync(input_file_name_1, "utf-8");
    input_2 = readFileSync(input_file_name_2, "utf-8");
    input_prod = readFileSync(
      `io/${new part1().constructor.name}.txt`,
      "utf-8"
    );
  });
  test("part 1", async () => {
    const output = await new part1().solve(input_1);
    expect(output).toBe(3749); // FIXME - part 1
  });
  test("part 1 - prod", async () => {
    const output = await new part1().solve(input_prod);
    expect(output).toBe(null); // FIXME - part 1 - prod
  });
  test.todo("part 2", async () => {
    const output = await new part2().solve(input_2);
    expect(output).toBe(null); // FIXME - part 2
  });
  test.todo("part 2 - prod", async () => {
    const output = await new part2().solve(input_prod);
    expect(output).toBe(null); // FIXME - part 2 - prod
  });
});
