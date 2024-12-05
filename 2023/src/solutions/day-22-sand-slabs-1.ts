import { Solution } from "../utils"

export default class SandSlabs extends Solution {
  solve(input: string) {
    type Brick = {
      start: [number, number, number]
      end: [number, number, number]
      supports: Set<number>
      supportedBy: Set<number>
      id: number
    }

    const bricks: Brick[] = input
      .split("\n")
      .map((line, i) => {
        const [start, end] = line
          .split("~")
          .map((coord) => coord.split(",").map(Number))
        return {
          start: start as [number, number, number],
          end: end as [number, number, number],
          supports: new Set<number>(),
          supportedBy: new Set<number>(),
          id: i,
        }
      })
      .sort(
        (a, b) =>
          Math.min(a.start[2], a.end[2]) - Math.min(b.start[2], b.end[2]),
      )

    const occupied = new Map<string, number>()

    function getPoints(brick: Brick): string[] {
      const points: string[] = []
      for (
        let x = Math.min(brick.start[0], brick.end[0]);
        x <= Math.max(brick.start[0], brick.end[0]);
        x++
      ) {
        for (
          let y = Math.min(brick.start[1], brick.end[1]);
          y <= Math.max(brick.start[1], brick.end[1]);
          y++
        ) {
          for (
            let z = Math.min(brick.start[2], brick.end[2]);
            z <= Math.max(brick.start[2], brick.end[2]);
            z++
          ) {
            points.push(`${x},${y},${z}`)
          }
        }
      }
      return points
    }

    // Let bricks fall
    for (const brick of bricks) {
      let canFall = true
      let currentZ = Math.min(brick.start[2], brick.end[2])

      while (canFall && currentZ > 1) {
        const nextPoints = getPoints({
          ...brick,
          start: [brick.start[0], brick.start[1], brick.start[2] - 1],
          end: [brick.end[0], brick.end[1], brick.end[2] - 1],
        })

        for (const point of nextPoints) {
          if (occupied.has(point)) {
            canFall = false
            break
          }
        }

        if (canFall) {
          brick.start[2]--
          brick.end[2]--
          currentZ--
        }
      }

      for (const point of getPoints(brick)) {
        occupied.set(point, brick.id)
      }
    }

    // Build support relationships
    for (const brick of bricks) {
      const pointsAbove = getPoints({
        ...brick,
        start: [brick.start[0], brick.start[1], brick.start[2] + 1],
        end: [brick.end[0], brick.end[1], brick.end[2] + 1],
      })

      for (const point of pointsAbove) {
        if (occupied.has(point) && occupied.get(point) !== brick.id) {
          brick.supports.add(occupied.get(point)!)
          bricks[occupied.get(point)!].supportedBy.add(brick.id)
        }
      }
    }

    // Count safely removable bricks
    let safeCount = 0
    for (const brick of bricks) {
      let safe = true
      for (const supportedBrick of brick.supports) {
        if (bricks[supportedBrick].supportedBy.size === 1) {
          safe = false
          break
        }
      }
      if (safe) safeCount++
    }

    return safeCount
  }
}
