import { default as part1 } from "#/solutions/day-11-plutonian-pebbles-1";
import { default as part2 } from "#/solutions/day-11-plutonian-pebbles-2";
import { describe, test, expect } from "bun:test";
import path from "node:path";

const input_file_name_1 = __filename
  .replace(/\.test\.ts$/, ".input.1.txt")
  .replace(/tests/, "tests/io");
const input_file_name_2 = __filename
  .replace(/\.test\.ts$/, ".input.2.txt")
  .replace(/tests/, "tests/io");
const input_file_name_prod = path.join(
  process.cwd(),
  "io",
  `${new part1().constructor.name}.txt`
);
const [input_1, input_2, input_prod] = await Promise.all(
  [input_file_name_1, input_file_name_2, input_file_name_prod].map(
    async (fn) => {
      return (await import(fn, { with: { type: "text" } })).default;
    }
  )
);

describe("Day 11: Plutonian Pebbles", () => {
  test("part 1", async () => {
    const output = await new part1().solve(input_1);
    expect(output).toBe(55312);
  });
  test("part 1 - prod", async () => {
    const output = await new part1().solve(input_prod);
    expect(output).toBe(218079);
  });
  test("part 2", async () => {
    const output = await new part2().solve(input_2);
    expect(output).toBe(65601038650482);
  });
  test("part 2 - prod", async () => {
    const output = await new part2().solve(input_prod);
    expect(output).toBe(259755538429618);
  });
});