import { Solution, get_matrix } from "#/utils";

type Pos = { x: number; y: number };

export default class HoofIt extends Solution {
  solve(input: string) {
    const grid = get_matrix(input).map((row) => row.map(Number));
    const trailheads: Pos[] = [];

    // Find all trailheads (positions with height 0)
    for (let y = 0; y < grid.length; y++) {
      for (let x = 0; x < grid[0].length; x++) {
        if (grid[y][x] === 0) {
          trailheads.push({ x, y });
        }
      }
    }

    // Calculate score for each trailhead
    const scores = trailheads.map((start) =>
      this.calculateTrailheadScore(grid, start)
    );

    return scores.reduce((a, b) => a + b, 0);
  }

  private calculateTrailheadScore(grid: number[][], start: Pos): number {
    const visited = new Set<string>();
    const reachable9s = new Set<string>();

    const explore = (pos: Pos, currentHeight: number) => {
      const key = `${pos.x},${pos.y}`;
      if (visited.has(key)) return;

      const height = grid[pos.y][pos.x];
      if (height !== currentHeight + 1) return;

      visited.add(key);

      if (height === 9) {
        reachable9s.add(key);
        return;
      }

      // Check all four directions
      const directions = [
        { x: 0, y: 1 },
        { x: 0, y: -1 },
        { x: 1, y: 0 },
        { x: -1, y: 0 },
      ];

      for (const dir of directions) {
        const newX = pos.x + dir.x;
        const newY = pos.y + dir.y;

        if (
          newX >= 0 &&
          newX < grid[0].length &&
          newY >= 0 &&
          newY < grid.length
        ) {
          explore({ x: newX, y: newY }, height);
        }
      }
    };

    // Start exploring from each adjacent position to the trailhead
    const directions = [
      { x: 0, y: 1 },
      { x: 0, y: -1 },
      { x: 1, y: 0 },
      { x: -1, y: 0 },
    ];

    for (const dir of directions) {
      const newX = start.x + dir.x;
      const newY = start.y + dir.y;

      if (
        newX >= 0 &&
        newX < grid[0].length &&
        newY >= 0 &&
        newY < grid.length
      ) {
        explore({ x: newX, y: newY }, 0);
      }
    }

    return reachable9s.size;
  }
}
