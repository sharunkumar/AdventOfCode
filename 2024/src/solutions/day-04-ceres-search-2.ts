import { get_matrix, Solution } from "#/utils";

export default class CeresSearch extends Solution {
  solve(input: string) {
    const grid = get_matrix(input);
    let count = 0;

    // Check each position as potential center of X
    for (let row = 1; row < grid.length - 1; row++) {
      for (let col = 1; col < grid[row].length - 1; col++) {
        // Check all 8 possible combinations of MAS in X shape
        // Upper-left to lower-right and upper-right to lower-left
        const patterns = [
          // Forward-Forward
          [
            [row - 1, col - 1, "M"] as const,
            [row, col, "A"] as const,
            [row + 1, col + 1, "S"] as const,
            [row - 1, col + 1, "M"] as const,
            [row + 1, col - 1, "S"] as const,
          ],
          // Forward-Backward
          [
            [row - 1, col - 1, "M"] as const,
            [row, col, "A"] as const,
            [row + 1, col + 1, "S"] as const,
            [row - 1, col + 1, "S"] as const,
            [row + 1, col - 1, "M"] as const,
          ],
          // Backward-Forward
          [
            [row - 1, col - 1, "S"] as const,
            [row, col, "A"] as const,
            [row + 1, col + 1, "M"] as const,
            [row - 1, col + 1, "M"] as const,
            [row + 1, col - 1, "S"] as const,
          ],
          // Backward-Backward
          [
            [row - 1, col - 1, "S"] as const,
            [row, col, "A"] as const,
            [row + 1, col + 1, "M"] as const,
            [row - 1, col + 1, "S"] as const,
            [row + 1, col - 1, "M"] as const,
          ],
        ];

        for (const pattern of patterns) {
          if (
            pattern.every(
              ([r, c, char]) =>
                r >= 0 &&
                r < grid.length &&
                c >= 0 &&
                c < grid[r].length &&
                grid[r][c] === char
            )
          ) {
            count++;
          }
        }
      }
    }

    return count;
  }
}
