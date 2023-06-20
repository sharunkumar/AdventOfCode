import { Solution } from "../utils";
import Counter from "../utils/Counter";

export default class BoilingBoulders extends Solution {
    solve(input: string) {
        type point3d = [number, number, number]
        function add(a: point3d, b: point3d) {
            return [a[0] + b[0], a[1] + b[1], a[2] + b[2]] as point3d
        }

        function hashPoint3D(point: point3d) {
            return JSON.stringify(point)
        }

        let coords = this.get_lines(input)
            .map(i => i.split(",").map(j => parseInt(j)) as point3d)
        // .pipelog()


        let facediffs = [[0.5, 0, 0], [-0.5, 0, 0], [0, 0.5, 0], [0, -0.5, 0], [0, 0, 0.5], [0, 0, -0.5]] as point3d[]

        let faces = coords.map(c => facediffs.map(f => add(f, c)))
            .flat()
            .map(x => [hashPoint3D(x), x])
        // .pipelog()

        const counter = new Counter(faces.map(x => x[0]));

        // console.log(new Set(counter.getEntries().map(x => x[1])))

        let result = counter.getEntries()
            .filter(x => x[1] == 1)
        // .pipelog()

        return result.length

    }
}
