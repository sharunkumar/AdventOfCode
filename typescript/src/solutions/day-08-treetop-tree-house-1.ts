import { inclusive_between, Solution } from "../utils";

export default class TreetopTreeHouse extends Solution {
  solve(input: string) {
    let trees = this.get_lines(input)
      .map((line) => line.split(""))
      .map((line_arr) => line_arr.map((item) => parseInt(item)));
    // .map(pipelog)

    let rows = trees.length;
    let cols = trees[0].length;

    let count = 2 * rows + 2 * (cols - 2);

    function isLargest(x: number, y: number, dx: number, dy: number) {
      const tree = trees[x][y];

      for (x += dx, y += dy; inclusive_between(x, 0, rows - 1) && inclusive_between(y, 0, cols - 1); x += dx, y += dy) {
        if (trees[x][y] >= tree) {
          return false;
        }
      }

      return true;
    }

    for (let i = 1; i < rows - 1; i++) {
      for (let j = 1; j < cols - 1; j++) {
        const result = isLargest(i, j, 0, 1) || isLargest(i, j, 0, -1) || isLargest(i, j, 1, 0) || isLargest(i, j, -1, 0);

        count += result ? 1 : 0;
      }
    }

    return count;
  }
}
