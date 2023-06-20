import { Solution, inclusive_between as ibw, intersect } from "../utils";
import Counter from "../utils/Counter";
import { add, hash, maxp, minp, mul, point3d, point_between } from "../utils/Point3D";

export default class BoilingBoulders extends Solution {
    solve(input: string) {
        let coords = this.get_lines(input)
            .map(i => i.split(",").map(j => parseInt(j)) as point3d)

        let min = add(coords.reduce(minp, [Infinity, Infinity, Infinity]), [-1, -1, -1])
        let max = add(coords.reduce(maxp, [-Infinity, -Infinity, -Infinity]), [1, 1, 1])

        let facediffs = [[0.5, 0, 0], [-0.5, 0, 0], [0, 0.5, 0], [0, -0.5, 0], [0, 0, 0.5], [0, 0, -0.5]] as point3d[]

        let faces = coords.map(c => facediffs.map(f => add(f, c)))
            .flat()
            .map(x => [hash(x), x] as [string, point3d])

        let droplets = new Set(coords.map(x => hash(x)))

        let q = [min]
        let air = new Set([hash(min)])

        while (q.length) {
            let p = q.pop()!

            facediffs
                .map(x => mul(x, 2))
                .map(x => add(p, x))
                .filter(x => point_between(x, min, max))
                .map(x => [hash(x), x] as [string, point3d])
                .filter(([h, _]) => !(droplets.has(h) || air.has(h)))
                .forEach(([k, p1]) => {
                    air.add(k)
                    q.push(p1)
                })
        }

        const free = new Set([...air].map(x => JSON.parse(x))
            .map(a => facediffs.map(f => add(f, a)))
            .flat()
            .map(x => hash(x))
        );


        const counter = new Counter(faces.map(x => x[0]));

        let result = counter.getEntries()
            .filter(x => free.has(x[0]))
            .filter(x => x[1] == 1)

        return result.length

    }
}
