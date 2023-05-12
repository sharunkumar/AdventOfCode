import { Solution, ascii_lowercase } from "../utils";
import { PriorityQueue } from 'p-queue-ts';

class Position {
    constructor(public x: number, public y: number) { }
}

function get_elevation(char: string) {
    if (char == "S") {
        return ascii_lowercase.indexOf("a")
    }
    else if (char == "E") {
        return ascii_lowercase.indexOf("z")
    }
    else {
        return ascii_lowercase.indexOf(char)
    }
}

export default class HillClimbingAlgorithm extends Solution {
    solve(input: string) {
        let S = new Position(0, 0)
        let E = new Position(0, 0)
        const matrix = this.get_lines(input)
            // .pipelog()
            .map(l => l.split(""))

        for (let i = 0; i < matrix.length; i++) {
            const line = matrix[i];
            for (let j = 0; j < line.length; j++) {
                const char = line[j];
                // console.log({ char, i, j })
                if (char == "S") {
                    S = new Position(i, j)
                }
                if (char == "E") {
                    E = new Position(i, j)
                }
            }
        }

        const elevation = matrix.map(line => line.map(get_elevation))//.pipelog()
        const visited = matrix.map(line => line.map(c => false))//.pipelog()

        return { matrix, S, E }
    }

}