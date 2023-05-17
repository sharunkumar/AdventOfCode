import { Solution, sleep, sum } from "../utils";

type Char = "#" | "." | "O"


export default class RegolithReservoir extends Solution {
    async solve(input: string) {
        let paths = this.get_lines(input)
            .map(line => line.split(" -> ").map(rock => rock.split(",").map(Number)))
            .pipelog()

        const rocks_x = paths.map(path => path.map(rock => rock[0])).flat().flat();
        const rocks_y = paths.map(path => path.map(rock => rock[1])).flat().flat();

        let min_x = rocks_x.reduce((acc, curr) => Math.min(acc, curr), 999)
        let max_x = rocks_x.reduce((acc, curr) => Math.max(acc, curr), 0)

        let min_y = rocks_y.reduce((acc, curr) => Math.min(acc, curr), 999)
        let max_y = rocks_y.reduce((acc, curr) => Math.max(acc, curr), 0)

        paths = paths.map(path => path.map(([x, y]) => [x - min_x, y - min_y])).pipelog()

        let starting = [500 - min_x, 0]

        max_x = max_x - min_x
        max_y = max_y - min_y

        min_x = min_y = 0

        console.log({ min_x: 0, max_x: max_x - min_x, min_y: 0, max_y: max_y - min_y, starting })

        let box = construct_box(paths, max_x, max_y)

        box.map(x => x.join("")).pipelog()

        // await draw(paths, { min_x: 0, max_x: max_x - min_x, min_y: 0, max_y: max_y - min_y, starting })
    }
}

function construct_box(paths: number[][][], max_x: number, max_y: number) {
    let box = [] as Char[][]
    for (let i = 0; i <= max_y; i++) {
        const row = [] as Char[]
        for (let j = 0; j <= max_x; j++) {
            row.push(".")
        }
        box.push(row)
    }

    return box
}
// async function draw(paths: number[][][], data: { min_x: number; max_x: number; min_y: number; max_y: number; starting: number[]; }) {
//     for (let i = 0; i < paths.length; i++) {
//         const path = paths[i];
        
//     }
// }
// function draw(paths: number[][][], starting: number[]) {
//     throw new Error("Function not implemented.");
// }
