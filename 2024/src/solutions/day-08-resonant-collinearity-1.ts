import { get_matrix, Solution } from "#/utils";

export default class ResonantCollinearity extends Solution {
  solve(input: string) {
    const matrix = get_matrix(input);
    const frequencies = new Map<string, number[][]>();

    // Collect all antenna positions by frequency
    for (let y = 0; y < matrix.length; y++) {
      for (let x = 0; x < matrix[y].length; x++) {
        const char = matrix[y][x];
        if (char !== ".") {
          if (!frequencies.has(char)) {
            frequencies.set(char, []);
          }
          frequencies.get(char)!.push([x, y]);
        }
      }
    }

    const antinodes = new Set<string>();

    // For each frequency, find all antinodes
    for (const [_, positions] of frequencies) {
      for (let i = 0; i < positions.length; i++) {
        for (let j = i + 1; j < positions.length; j++) {
          const [x1, y1] = positions[i];
          const [x2, y2] = positions[j];

          // Calculate distance between antennas
          const dx = x2 - x1;
          const dy = y2 - y1;
          const dist = dx * dx + dy * dy;

          // Find antinodes at twice the distance
          const antinode1x = x1 - dx;
          const antinode1y = y1 - dy;
          const antinode2x = x2 + dx;
          const antinode2y = y2 + dy;

          // Check if antinodes are within bounds
          if (
            antinode1x >= 0 &&
            antinode1x < matrix[0].length &&
            antinode1y >= 0 &&
            antinode1y < matrix.length
          ) {
            antinodes.add(`${antinode1x},${antinode1y}`);
          }

          if (
            antinode2x >= 0 &&
            antinode2x < matrix[0].length &&
            antinode2y >= 0 &&
            antinode2y < matrix.length
          ) {
            antinodes.add(`${antinode2x},${antinode2y}`);
          }
        }
      }
    }

    return antinodes.size;
  }
}
