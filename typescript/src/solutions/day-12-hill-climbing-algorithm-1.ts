import { Solution, ascii_lowercase } from "../utils";
import { PriorityQueue } from 'p-queue-ts';

class Position {
    constructor(public x: number, public y: number, public z: number, public steps: number = 0) { }
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
        let S = new Position(0, 0, 0)
        let E = new Position(0, 0, 0)
        const matrix = this.get_lines(input)
            // .pipelog()
            .map(l => l.split(""))

        function position(i: number, j: number, steps: number = 0) {
            return new Position(i, j, get_elevation(matrix[i][j]), steps)
        }

        for (let i = 0; i < matrix.length; i++) {
            const line = matrix[i];
            for (let j = 0; j < line.length; j++) {
                const char = line[j];
                // console.log({ char, i, j })
                if (char == "S") {
                    S = position(i, j)
                }
                if (char == "E") {
                    E = position(i, j, 10)
                }
            }
        }

        const elevation = matrix.map(line => line.map(get_elevation))//.pipelog()
        const visited = matrix.map(line => line.map(c => false))//.pipelog()

        const pq = new PriorityQueue((a: Position, b: Position) => a.steps > b.steps)

        pq.push(S)
        pq.push(E)

        console.log(pq.pop())

        return { matrix, S, E }
    }

}