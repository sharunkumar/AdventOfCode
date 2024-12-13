import { get_lines, Solution } from "#/utils";

type Point = [number, number];

export default class GardenGroups extends Solution {
  solve(input: string) {
    const grid = get_lines(input).map((line) => line.split(""));
    const rows = grid.length;
    const cols = grid[0].length;

    const regions: Set<string>[] = [];
    const seen = new Set<string>();

    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const key = `${r},${c}`;
        if (seen.has(key)) continue;

        seen.add(key);
        const region = new Set([key]);
        const queue: Point[] = [[r, c]];
        const crop = grid[r][c];

        while (queue.length > 0) {
          const [cr, cc] = queue.shift()!;
          const neighbors: Point[] = [
            [cr - 1, cc],
            [cr + 1, cc],
            [cr, cc - 1],
            [cr, cc + 1],
          ];

          for (const [nr, nc] of neighbors) {
            if (nr < 0 || nc < 0 || nr >= rows || nc >= cols) continue;
            if (grid[nr][nc] !== crop) continue;

            const nKey = `${nr},${nc}`;
            if (region.has(nKey)) continue;

            region.add(nKey);
            queue.push([nr, nc]);
          }
        }

        for (const pos of region) seen.add(pos);
        regions.push(region);
      }
    }

    function sides(region: Set<string>): number {
      const cornerCandidates = new Set<string>();

      for (const pos of region) {
        const [r, c] = pos.split(",").map(Number);
        const corners = [
          [r - 0.5, c - 0.5],
          [r + 0.5, c - 0.5],
          [r + 0.5, c + 0.5],
          [r - 0.5, c + 0.5],
        ];

        for (const [cr, cc] of corners) {
          cornerCandidates.add(`${cr},${cc}`);
        }
      }

      let corners = 0;

      for (const corner of cornerCandidates) {
        const [cr, cc] = corner.split(",").map(Number);
        const config = [
          region.has(`${cr - 0.5},${cc - 0.5}`),
          region.has(`${cr + 0.5},${cc - 0.5}`),
          region.has(`${cr + 0.5},${cc + 0.5}`),
          region.has(`${cr - 0.5},${cc + 0.5}`),
        ];

        const number = config.filter((x) => x).length;

        if (number === 1) {
          corners += 1;
        } else if (number === 2) {
          if (
            (config[0] && config[2] && !config[1] && !config[3]) ||
            (!config[0] && config[1] && !config[2] && config[3])
          ) {
            corners += 2;
          }
        } else if (number === 3) {
          corners += 1;
        }
      }

      return corners;
    }

    return regions.reduce(
      (sum, region) => sum + region.size * sides(region),
      0
    );
  }
}
