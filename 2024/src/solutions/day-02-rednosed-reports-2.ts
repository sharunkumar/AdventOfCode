import { inclusive_between as ibw, regexMatch, Solution } from "#/utils";

export default class RedNosedReports extends Solution {
  solve(input: string) {
    const matrix = this.get_lines(input).map((line) =>
      regexMatch(line, /(\d+)/g).map((n) => parseInt(n))
    );

    const safeReports = matrix.filter((row) => {
      const isValidSequence = (numbers: number[]) => {
        const diffs = numbers
          .slice(0, -1)
          .map((n, i) => numbers[i + 1] - numbers[i]);

        return (
          diffs.every((x) => x > 0 && ibw(x, 1, 3)) ||
          diffs.every((x) => x < 0 && ibw(x, -3, -1))
        );
      };

      if (isValidSequence(row)) {
        return true;
      }

      for (let i = 0; i < row.length; i++) {
        const modifiedRow = [...row.slice(0, i), ...row.slice(i + 1)];
        if (isValidSequence(modifiedRow)) {
          return true;
        }
      }

      return false;
    });

    return safeReports.length;
  }
}
