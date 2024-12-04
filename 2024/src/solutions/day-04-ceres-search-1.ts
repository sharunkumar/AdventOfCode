import { Solution } from "#/utils";

export default class CeresSearch extends Solution {
  solve(input: string) {
    const grid = this.get_matrix(input);
    let count = 0;
    const rows = grid.length;
    const cols = grid[0].length;
    const directions = [
      [0, 1], // right
      [1, 0], // down
      [1, 1], // diagonal down-right
      [-1, 1], // diagonal up-right
      [0, -1], // left
      [-1, 0], // up
      [-1, -1], // diagonal up-left
      [1, -1], // diagonal down-left
    ];

    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        for (const [dx, dy] of directions) {
          let x = row;
          let y = col;
          let word = "";

          for (let i = 0; i < 4; i++) {
            if (x >= 0 && x < rows && y >= 0 && y < cols) {
              word += grid[x][y];
              x += dx;
              y += dy;
            }
          }

          if (word === "XMAS") {
            count++;
          }
        }
      }
    }

    return count;
  }
}
