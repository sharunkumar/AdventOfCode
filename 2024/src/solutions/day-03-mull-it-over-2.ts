import { regexMatch, Solution, sum } from "#/utils";

export default class MullItOver extends Solution {
  solve(input: string) {
    const exp = regexMatch(input, /mul\(\d+,\d+\)/g)
      .map((mul) => regexMatch(mul, /\d+/g).map((n) => parseInt(n)))
      .map(([a, b]) => a * b);

    return exp.reduce(sum);
  }
}
