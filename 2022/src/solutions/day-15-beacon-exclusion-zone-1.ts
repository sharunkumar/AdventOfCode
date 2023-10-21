import { MinPriorityQueue } from "@datastructures-js/priority-queue";
import { Solution, inclusive_between as ibw } from "../utils";
import { Point } from "../utils/Point";

class Sensor extends Point {}
class Beacon extends Point {}

export default class BeaconExclusionZone extends Solution {
  solve(input: string) {
    console.clear();
    let coords = this.get_lines(input)
      .map((line) => [...line.matchAll(/\-?\d+/g)].map((m) => Number(m[0])))
      .map(([x1, y1, x2, y2]) => [new Sensor(x1, y1), new Beacon(x2, y2)] as [Sensor, Beacon]);
    // .pipelog()

    let dist = coords.map(([p1, p2]) => p1.manhattan_distance_to(p2));
    // .pipelog()

    let sensors = coords.map(([p1, _]) => p1);
    // .pipelog()

    let beacons = coords.map(([_, p2]) => p2);
    // .pipelog()

    let Y = 2000000;

    type Interval = [number, number];

    let intervals = [] as Interval[];

    sensors.forEach((s, idx) => {
      let dx = dist[idx] - Math.abs(s.y - Y);

      if (dx > 0) {
        intervals.push([s.x - dx, s.x + dx]);
      }
    });

    let beacons_xs = beacons.filter((b) => b.y == Y).map((b) => b.x);
    // .pipelog()

    let pq = new MinPriorityQueue<Interval>((i) => i[0]);

    intervals.forEach((i) => pq.push(i));

    let xs = new Set<Number>();

    function spread(int: Interval) {
      for (let i = int[0]; i <= int[1]; i++) {
        if (!beacons_xs.includes(i)) {
          xs.add(i);
        }
      }
    }

    while (!pq.isEmpty()) {
      let int1 = pq.pop();
      if (pq.isEmpty()) {
        spread(int1);
        break;
      }
      let int2 = pq.pop();

      if (ibw(int2[0], int1[0], int1[1])) {
        pq.push([Math.min(int1[0], int2[0]), Math.max(int1[1], int2[1])]);
      } else {
        spread(int1);
        pq.push(int2);
      }
    }

    return { exclusion: xs.size };
  }
}
