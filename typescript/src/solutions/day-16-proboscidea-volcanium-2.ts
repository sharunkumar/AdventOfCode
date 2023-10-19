import { Solution, regexMatch } from "../utils";

type valve = string;
type rate = number;
interface distance {
  [key: valve]: { [key: valve]: rate };
}
interface valves {
  [key: valve]: rate;
}
interface tunnels {
  [key: valve]: valve[];
}
interface indices {
  [key: valve]: number;
}

export default class ProboscideaVolcanium extends Solution {
  solve(input: string) {
    let valves: valves = {};
    let tunnels: tunnels = {};
    let dist: distance = {};
    let nonempty = [] as valve[];
    this.get_lines(input)
      .map((line) => regexMatch(line, /[A-Z0-9]+/g))
      .forEach(([_, valve, rate, ...targets]) => {
        valves[valve] = Number(rate);
        tunnels[valve] = targets;
      });

    for (let valve in valves) {
      if (valve != "AA" && !valves[valve]) continue;
      if (valve != "AA") nonempty.push(valve);

      dist[valve] = { AA: 0 };
      dist[valve][valve] = 0;

      let visited = [valve] as valve[];

      let queue = [[0, valve] as [number, valve]];

      while (queue.length > 0) {
        let item = queue.shift();
        if (!item) break;
        let [d, pos] = item;

        for (let i = 0; i < tunnels[pos].length; i++) {
          const nb = tunnels[pos][i];
          if (visited.includes(nb)) continue;
          visited.push(nb);
          if (valves[nb]) {
            dist[valve][nb] = d + 1;
          }
          queue.push([d + 1, nb]);
        }
      }

      delete dist[valve][valve];
      if (valve != "AA") {
        delete dist[valve]["AA"];
      }
    }

    let indices: indices = {};

    nonempty.forEach((x, idx) => {
      indices[x] = idx;
    });

    let cache = new Map<string, number>();

    function dfs(time: number, valve: valve, bitmask: number) {
      let hit = cache.get(`${time}, ${valve}, ${bitmask}`);
      if (hit) return hit;

      let maxval = 0;

      for (let nb in dist[valve]) {
        let bit = 1 << indices[nb]; // open the valve in the bitmask
        if (bitmask & bit) continue;
        let remaining = time - dist[valve][nb] - 1; //time to open the valve
        if (remaining <= 0) continue;

        maxval = Math.max(
          maxval,
          dfs(remaining, nb, bitmask | bit) + valves[nb] * remaining,
        );

        if (Number.isNaN(maxval)) {
          throw new Error("wtf");
        }
      }

      cache.set(`${time}, ${valve}, ${bitmask}`, maxval);
      return maxval;
    }

    let global_max = 0;

    let b = (1 << nonempty.length) - 1;

    for (let i = 0; i < (b + 1) / 2; i++) {
      global_max = Math.max(
        global_max,
        dfs(26, "AA", i) + dfs(26, "AA", b ^ i),
      );
    }

    return { global_max };
  }
}
