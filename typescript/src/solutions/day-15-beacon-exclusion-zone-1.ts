import { Point, Solution } from "../utils";

export default class BeaconExclusionZone extends Solution {
    solve(input: string) {
        console.clear()
        let coords = this.get_lines(input)
            .map(line => [...line.matchAll(/\-?\d+/g)].map(m => Number(m[0])))
            .map(([x1, y1, x2, y2]) => [new Point(x1, y1), new Point(x2, y2)])
            .pipelog()

        let dist = coords.map(([p1, p2]) => p1.manhattan_distance_to(p2))
            .pipelog()

        let Y = 10
    }

}