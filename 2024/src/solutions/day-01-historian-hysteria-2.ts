import { Solution, regexMatch, Counter, get_lines } from "#/utils";

export default class HistorianHysteria extends Solution {
  solve(input: string) {
    const lists = get_lines(input)
      .map((x) => regexMatch(x, /\d+/g))
      .map((x) => [parseInt(x[0]), parseInt(x[1])]);

    const list1 = lists.map((x) => x[0]);
    const counts = new Counter(lists.map((x) => x[1]));

    return list1.map((x) => counts.getCount(x) * x).sum();
  }
}
