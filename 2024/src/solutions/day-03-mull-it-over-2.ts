import { regexMatch, Solution, sum } from "#/utils";

export default class MullItOver extends Solution {
  solve(input: string) {
    const exp = regexMatch(input, /(mul\(\d+,\d+\)|do\(\)|don't\(\))/g);
    let result = 0;
    let shouldDo = true;

    for (const e of exp) {
      if (e === "do()") {
        shouldDo = true;
      } else if (e === "don't()") {
        shouldDo = false;
      } else if (shouldDo) {
        result += regexMatch(e, /\d+/g)
          .map((n) => parseInt(n))
          .reduce((a, b) => a * b, 1);
      }
    }

    return result;
  }
}
