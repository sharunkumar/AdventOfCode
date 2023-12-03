import { Solution } from "../utils";

export default class Trebuchet extends Solution {
  solve(input: string) {
    let result = this.get_lines(input)
      .map((line) =>
        line
          .split("")
          .map(Number)
          .filter((x) => !isNaN(x)),
      )
      .map((arr) => {
        const n = arr.length;
        return `${arr[0]}${arr[n - 1]}`;
      })
      .map(Number)
      .sum();

    return result;
  }
}
