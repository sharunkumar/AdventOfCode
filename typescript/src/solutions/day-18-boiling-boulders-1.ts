import { Solution } from "../utils";

export default class BoilingBoulders extends Solution {
    solve(input: string) {
        let coords = this.get_lines(input)
            .map(i => i.split(",").map(j => parseInt(j)))
            .pipelog()

        let coords_set = new Set(coords)

        console.log({ coords_set })

    }
}
