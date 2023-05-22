import { Solution } from "../utils";

class Rock {
    rock_height: number;
    rock_width: number;
    private vec = [] as number[]
    constructor(public rows: string[]) {
        console.log({ rows })
        this.rock_height = this.rows.length
        this.rock_width = this.rows[0].length
    }

    surface_vector() {
        if (this.vec.length > 0) { // cache it
            return this.vec
        }

        let surface = [] as number[]

        for (let i = 0; i < this.rock_width; i++) {
            surface.push(0)
        }

        let r = this.rock_height - 1

        let inc = 1

        while (surface.includes(0) && r >= 0) {
            let spread = this.rows[r].split("").map(c => c == "#" ? inc : 0)
            spread.forEach((x, idx) => surface[idx] = (x == inc && surface[idx] == 0) ? x : surface[idx])

            inc++
            r--
        }

        this.vec = surface.map(s => -s + 1);
        return this.vec
    }
}

export default class PyroclasticFlow extends Solution {
    solve(input: string) {

        let [stream, ...rocks_raw] = this.get_blocks(input)

        let rocks = rocks_raw.map(this.get_lines.bind(this)).map(r => new Rock(r))
        // .pipelog()

        console.log({ stream })

        rocks.forEach((x, idx) => console.log(idx, x.surface_vector()))

        // console.log({ surface: rocks[0].surface_vector() })
    }
}
