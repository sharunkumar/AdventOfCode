import { get_lines, Solution } from "#/utils";

export default class GardenGroups extends Solution {
  solve(input: string) {
    const grid = get_lines(input).map((line) => line.split(""));
    const rows = grid.length;
    const cols = grid[0].length;
    const visited: boolean[][] = Array.from({ length: rows }, () =>
      Array(cols).fill(false)
    );
    let totalPrice = 0;

    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        if (!visited[i][j]) {
          const [area, perimeter] = this.dfs(grid, visited, i, j);
          totalPrice += area * perimeter;
        }
      }
    }

    return totalPrice;
  }

  dfs(
    grid: string[][],
    visited: boolean[][],
    row: number,
    col: number
  ): [number, number] {
    const rows = grid.length;
    const cols = grid[0].length;
    const plant = grid[row][col];
    let area = 0;
    let perimeter = 0;

    const stack = [[row, col]];
    while (stack.length > 0) {
      const [r, c] = stack.pop()!;
      if (visited[r][c]) continue;
      visited[r][c] = true;
      area++;

      const neighbors = [
        [r - 1, c],
        [r + 1, c],
        [r, c - 1],
        [r, c + 1],
      ];

      for (const [nr, nc] of neighbors) {
        if (
          nr < 0 ||
          nr >= rows ||
          nc < 0 ||
          nc >= cols ||
          grid[nr][nc] !== plant
        ) {
          perimeter++;
        } else if (!visited[nr][nc]) {
          stack.push([nr, nc]);
        }
      }
    }

    return [area, perimeter];
  }
}
