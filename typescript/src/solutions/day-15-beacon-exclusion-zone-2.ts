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

        let pos_lines = [] as number[]
        let neg_lines = [] as number[]

        sensors.forEach((s, i) => {
            const d = dist[i];
            neg_lines.push(...[s.x + s.y - d, s.x + s.y + d])
            pos_lines.push(...[s.x - s.y - d, s.x - s.y + d])
        })

        let pos = 0
        let neg = 0

        for (let i = 0; i < pos_lines.length; i++) {
            for (let j = i + 1; j < neg_lines.length; j++) {
                pos = this.calc(pos_lines, i, j, pos);
                neg = this.calc(neg_lines, i, j, neg)
            }
        }

        let [x, y] = [(pos + neg) / 2, (neg - pos) / 2]

        // console.log({ x, y })

        return { tuning_frequency: x * 4000000 + y }
    }

    private calc(lines: number[], i: number, j: number, pos: number) {
        let a = lines[i];
        let b = lines[j];

        if (Math.abs(a - b) == 2)
            pos = Math.min(a, b) + 1;
        return pos;
    }
}