import { get_lines, Solution } from "#/utils";

export default class GuardGallivant extends Solution {
  solve(input: string) {
    const grid = get_lines(input).map((line) => line.split(""));
    const visited = new Set<string>();
    let pos = { x: 0, y: 0, dir: "up" };

    for (let y = 0; y < grid.length; y++) {
      for (let x = 0; x < grid[y].length; x++) {
        if (grid[y][x] === "^") {
          pos = { x, y, dir: "up" };
          grid[y][x] = ".";
        }
      }
    }

    const directions = {
      up: { dx: 0, dy: -1, right: "right" },
      right: { dx: 1, dy: 0, right: "down" },
      down: { dx: 0, dy: 1, right: "left" },
      left: { dx: -1, dy: 0, right: "up" },
    };

    while (true) {
      visited.add(`${pos.x},${pos.y}`);

      const dir = directions[pos.dir];
      const nextX = pos.x + dir.dx;
      const nextY = pos.y + dir.dy;

      if (
        nextY < 0 ||
        nextY >= grid.length ||
        nextX < 0 ||
        nextX >= grid[0].length
      ) {
        break;
      }

      if (grid[nextY][nextX] === "#") {
        pos.dir = dir.right;
      } else {
        pos.x = nextX;
        pos.y = nextY;
      }
    }

    return visited.size;
  }
}
