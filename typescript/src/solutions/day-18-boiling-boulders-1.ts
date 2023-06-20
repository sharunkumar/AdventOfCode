import { Solution } from "../utils";
import Counter from "../utils/Counter";

export default class BoilingBoulders extends Solution {
    solve(input: string) {
        type point3d = [number, number, number]
        function add(a: point3d, b: point3d) {
            return [a[0] + b[0], a[1] + b[1], a[2] + b[2]] as point3d
        }

        function hashPoint3D(point: point3d) {
            let [x, y, z] = point;
            x *= 2
            y *= 2
            z *= 2
            let hash = 5381;

            hash = ((hash << 5) + hash) + x;
            hash = ((hash << 5) + hash) + y;
            hash = ((hash << 5) + hash) + z;

            return hash;
        }

        let coords = this.get_lines(input)
            .map(i => i.split(",").map(j => parseInt(j)) as point3d)
        // .pipelog()


        let facediffs = [[0.5, 0, 0], [-0.5, 0, 0], [0, 0.5, 0], [0, -0.5, 0], [0, 0, 0.5], [0, 0, -0.5]] as point3d[]

        let faces = coords.map(c => facediffs.map(f => add(f, c)))
            .flat()
            .map(x => [hashPoint3D(x), x])
        // .pipelog()

        let counter = new Counter(faces.map(x => x[0])).getEntries()
            .filter(x => x[1] == 1)
        // .pipelog()

        return counter.length

    }
}
