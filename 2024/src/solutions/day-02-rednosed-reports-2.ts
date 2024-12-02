import { inclusive_between as ibw, regexMatch, Solution } from "#/utils";

export default class RedNosedReports extends Solution {
  solve(input: string) {
    const matrix = this.get_lines(input).map((line) =>
      regexMatch(line, /(\d+)/g).map((n) => parseInt(n))
    );

    const diffs = matrix
      .map((row) => {
        return row
          .flatMap((x, idx) => x - row[idx + 1])
          .filter((x) => !isNaN(x));
      })
      .filter((row) => {
        return (
          (row.every((x) => x > 0) && row.every((x) => ibw(x, 1, 3))) ||
          (row.every((x) => x < 0) && row.every((x) => ibw(x, -3, -1)))
        );
      });
    console.log();

    return diffs.length;
  }
}
