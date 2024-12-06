import { get_matrix, Solution } from "#/utils";

type Direction = "up" | "right" | "down" | "left";
type Pos = { x: number; y: number; dir: Direction };

export default class GuardGallivant extends Solution {
  solve(input: string) {
    const grid = get_matrix(input);
    let startPos: Pos | null = null;

    for (let y = 0; y < grid.length; y++) {
      for (let x = 0; x < grid[y].length; x++) {
        if (grid[y][x] === "^") {
          startPos = { x, y, dir: "up" };
          grid[y][x] = ".";
        }
      }
    }

    if (!startPos) return 0;

    const directions: Record<
      Direction,
      { dx: number; dy: number; right: Direction }
    > = {
      up: { dx: 0, dy: -1, right: "right" },
      right: { dx: 1, dy: 0, right: "down" },
      down: { dx: 0, dy: 1, right: "left" },
      left: { dx: -1, dy: 0, right: "up" },
    };

    let count = 0;
    for (let y = 0; y < grid.length; y++) {
      for (let x = 0; x < grid[0].length; x++) {
        if (grid[y][x] !== "." || (x === startPos.x && y === startPos.y)) {
          continue;
        }

        const testGrid = grid.map((row) => [...row]);
        testGrid[y][x] = "#";

        const visited = new Set<string>();
        const pos = { ...startPos };

        let isLoop = false;
        while (true) {
          const key = `${pos.x},${pos.y},${pos.dir}`;
          if (visited.has(key)) {
            isLoop = true;
            break;
          }
          visited.add(key);

          const dir = directions[pos.dir];
          const nextX = pos.x + dir.dx;
          const nextY = pos.y + dir.dy;

          if (
            nextY < 0 ||
            nextY >= testGrid.length ||
            nextX < 0 ||
            nextX >= testGrid[0].length
          ) {
            break;
          }

          if (testGrid[nextY][nextX] === "#") {
            pos.dir = dir.right;
          } else {
            pos.x = nextX;
            pos.y = nextY;
          }
        }

        if (isLoop) {
          count++;
        }
      }
    }

    return count;
  }
}
