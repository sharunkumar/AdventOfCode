import { default as part1 } from "#/solutions/day-09-disk-fragmenter-1";
import { default as part2 } from "#/solutions/day-09-disk-fragmenter-2";
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

describe("Day 09: Disk Fragmenter", async () => {
  test("part 1", async () => {
    const output = await new part1().solve(input_1);
    expect(output).toBe(1928); // FIXME - part 1
  });
  test("part 1 - prod", async () => {
    const output = await new part1().solve(input_prod);
    expect(output).toBe(6367087064415); // FIXME - part 1 - prod
  });
  test("part 2", async () => {
    const output = await new part2().solve(input_2);
    expect(output).toBe(2858); // FIXME - part 2
  });
  test("part 2 - prod", async () => {
    const output = await new part2().solve(input_prod);
    expect(output).toBe(6390781891880); // FIXME - part 2 - prod
  });
});
