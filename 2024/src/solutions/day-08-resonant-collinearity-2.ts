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
      if (positions.length > 1) {
        // Add antenna positions as antinodes
        for (const [x, y] of positions) {
          antinodes.add(`${x},${y}`);
        }

        // Check all pairs of antennas
        for (let i = 0; i < positions.length; i++) {
          for (let j = i + 1; j < positions.length; j++) {
            const [x1, y1] = positions[i];
            const [x2, y2] = positions[j];

            // Calculate line parameters
            const dx = x2 - x1;
            const dy = y2 - y1;

            // Check all points in the grid
            for (let y = 0; y < matrix.length; y++) {
              for (let x = 0; x < matrix[0].length; x++) {
                // Check if point (x,y) is collinear with the two antennas
                const crossProduct = (x - x1) * dy - (y - y1) * dx;
                if (crossProduct === 0) {
                  // Check if point lies between or beyond the antennas
                  const dotProduct = (x - x1) * dx + (y - y1) * dy;
                  antinodes.add(`${x},${y}`);
                }
              }
            }
          }
        }
      }
    }

    return antinodes.size;
  }
}
