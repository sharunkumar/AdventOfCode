import { inclusive_between, Solution } from "../utils";

export default class TreetopTreeHouse extends Solution {
  solve(input: string) {
    let trees = this.get_lines(input)
      .map((line) => line.split(""))
      .map((line_arr) => line_arr.map((item) => parseInt(item)));
    // .map(pipelog)

    let rows = trees.length;
    let cols = trees[0].length;

    let max_score = -1;

    function directionalScore(x: number, y: number, dx: number, dy: number) {
      const tree = trees[x][y];
      let score = 0;

      for (x += dx, y += dy; inclusive_between(x, 0, rows - 1) && inclusive_between(y, 0, cols - 1); x += dx, y += dy) {
        if (trees[x][y] >= tree) {
          return score + 1;
        }
        score++;
      }

      return score;
    }

    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        const result = directionalScore(i, j, 0, 1) * directionalScore(i, j, 0, -1) * directionalScore(i, j, 1, 0) * directionalScore(i, j, -1, 0);

        max_score = Math.max(max_score, result);
      }
    }

    return max_score;
  }
}
