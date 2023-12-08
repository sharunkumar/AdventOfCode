import { Solution } from "../utils"
import Counter from "../utils/Counter"
import { add, hash, point3d } from "../utils/Point3D"

export default class BoilingBoulders extends Solution {
  solve(input: string) {
    let coords = this.get_lines(input).map(
      (i) => i.split(",").map((j) => parseInt(j)) as point3d,
    )
    // .pipelog()

    let facediffs = [
      [0.5, 0, 0],
      [-0.5, 0, 0],
      [0, 0.5, 0],
      [0, -0.5, 0],
      [0, 0, 0.5],
      [0, 0, -0.5],
    ] as point3d[]

    let faces = coords
      .map((c) => facediffs.map((f) => add(f, c)))
      .flat()
      .map((x) => [hash(x), x])
    // .pipelog()

    const counter = new Counter(faces.map((x) => x[0]))

    // console.log(new Set(counter.getEntries().map(x => x[1])))

    let result = counter.getEntries().filter((x) => x[1] == 1)
    // .pipelog()

    return result.length
  }
}
