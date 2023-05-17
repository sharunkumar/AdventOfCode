import { MinPriorityQueue } from "@datastructures-js/priority-queue";
import { Point, Solution, inclusive_between as ibw } from "../utils";

class Sensor extends Point { }
class Beacon extends Point { }

export default class BeaconExclusionZone extends Solution {
    solve(input: string) {
        console.clear()
        let coords = this.get_lines(input)
            .map(line => [...line.matchAll(/\-?\d+/g)].map(m => Number(m[0])))
            .map(([x1, y1, x2, y2]) => [new Sensor(x1, y1), new Beacon(x2, y2)] as [Sensor, Beacon])
        // .pipelog()

        let dist = coords.map(([p1, p2]) => p1.manhattan_distance_to(p2))
        // .pipelog()

        let sensors = coords.map(([p1, _]) => p1)
        // .pipelog()

        let beacons = coords.map(([_, p2]) => p2)
        // .pipelog()

        let Y = 2000000

        type Interval = [number, number]

        let intervals = [] as Interval[]

        sensors.forEach((s, idx) => {
            let dx = dist[idx] - Math.abs(s.y - Y)

            if (dx > 0) {
                intervals.push([s.x - dx, s.x + dx])
            }
        })

        let beacons_xs = beacons
            .filter(b => b.y == Y)
            .map(b => b.x)
        // .pipelog()

        intervals.sort((i1, i2) => i1[0] - i2[0])
        // .pipelog()

        let xs = new Set<Number>()

        function spread(int: Interval) {
            for (let i = int[0]; i <= int[1]; i++) {
                if (!beacons_xs.includes(i)) {
                    xs.add(i)
                }
            }
        }

        while (intervals.length > 0) {
            let [i1, i2] = [intervals.shift(), intervals.shift()]

            if (!i1) break

            if (!i2) {
                spread(i1)
                break
            }

            if (ibw(i2[0], i1[0], i2[0])) {
                intervals.unshift([Math.min(i1[0], i2[0]), Math.max(i1[1], i2[1])])
            }
        }

        return { exclusion: xs.size }
    }

}