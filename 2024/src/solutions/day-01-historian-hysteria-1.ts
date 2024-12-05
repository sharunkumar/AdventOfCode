import { get_lines, regexMatch, Solution } from "#/utils";

export default class HistorianHysteria extends Solution {
  solve(input: string) {
    const lists = get_lines(input)
      .map((x) => regexMatch(x, /\d+/g))
      .map((x) => [parseInt(x[0]), parseInt(x[1])]);

    const list1 = lists.map((x) => x[0]).sort();
    const list2 = lists.map((x) => x[1]).sort();

    const result = list1
      .map((x, idx) => Math.abs(list1[idx] - list2[idx]))
      .sum();

    return result;
  }
}
