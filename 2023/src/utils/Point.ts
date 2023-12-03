import { manhattan_distance } from "."

export class Point {
  constructor(
    public x: number,
    public y: number,
  ) {}

  manhattan_distance_to(other: Point) {
    return manhattan_distance(this.x, this.y, other.x, other.y)
  }
}
