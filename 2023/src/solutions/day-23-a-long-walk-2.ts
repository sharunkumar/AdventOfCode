import { Solution } from "../utils"

export default class ALongWalk extends Solution {
  solve(input: string) {
    const grid = this.get_lines(input)
    const start: [number, number] = [0, grid[0].indexOf(".")]
    const end: [number, number] = [
      grid.length - 1,
      grid[grid.length - 1].indexOf("."),
    ]

    const points: [number, number][] = [start, end]

    for (let r = 0; r < grid.length; r++) {
      for (let c = 0; c < grid[0].length; c++) {
        if (grid[r][c] === "#") continue

        let neighbors = 0
        for (const [nr, nc] of [
          [r - 1, c],
          [r + 1, c],
          [r, c - 1],
          [r, c + 1],
        ]) {
          if (
            nr >= 0 &&
            nr < grid.length &&
            nc >= 0 &&
            nc < grid[0].length &&
            grid[nr][nc] !== "#"
          ) {
            neighbors++
          }
        }
        if (neighbors >= 3) {
          points.push([r, c])
        }
      }
    }

    const graph = new Map<string, Map<string, number>>()
    for (const pt of points) {
      graph.set(`${pt[0]},${pt[1]}`, new Map())
    }

    for (const [sr, sc] of points) {
      const stack: [number, number, number][] = [[0, sr, sc]]
      const seen = new Set([`${sr},${sc}`])

      while (stack.length > 0) {
        const [n, r, c] = stack.pop()!

        if (n !== 0 && points.some(([pr, pc]) => pr === r && pc === c)) {
          graph.get(`${sr},${sc}`)!.set(`${r},${c}`, n)
          continue
        }

        for (const [dr, dc] of [
          [-1, 0],
          [1, 0],
          [0, -1],
          [0, 1],
        ]) {
          const nr = r + dr
          const nc = c + dc
          if (
            nr >= 0 &&
            nr < grid.length &&
            nc >= 0 &&
            nc < grid[0].length &&
            grid[nr][nc] !== "#" &&
            !seen.has(`${nr},${nc}`)
          ) {
            stack.push([n + 1, nr, nc])
            seen.add(`${nr},${nc}`)
          }
        }
      }
    }

    const seen = new Set<string>()

    const dfs = (pt: [number, number]): number => {
      if (pt[0] === end[0] && pt[1] === end[1]) return 0

      let m = -Infinity

      seen.add(`${pt[0]},${pt[1]}`)
      for (const [nx, dist] of graph.get(`${pt[0]},${pt[1]}`)!) {
        if (!seen.has(nx)) {
          m = Math.max(
            m,
            dfs(nx.split(",").map(Number) as [number, number]) + dist,
          )
        }
      }
      seen.delete(`${pt[0]},${pt[1]}`)

      return m
    }

    return dfs(start)
  }
}
