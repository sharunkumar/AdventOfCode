import { Solution, ascii_lowercase, inclusive_between as ibw } from "../utils";
import { MaxPriorityQueue, MinPriorityQueue } from '@datastructures-js/priority-queue';

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
        const matrix = this.get_lines(input).map(l => l.split(""))
        const elevation = matrix.map(line => line.map(get_elevation))
        // elevation.map(line => line.toString()).pipelog()
        const visited = matrix.map(line => line.map(c => false))

        function position(i: number, j: number, steps: number = 0) {
            return new Position(i, j, get_elevation(matrix[i][j]), steps)
        }

        for (let i = 0; i < matrix.length; i++) {
            const line = matrix[i];
            for (let j = 0; j < line.length; j++) {
                const char = line[j];
                if (char == "S") {
                    S = position(i, j)
                }
                if (char == "E") {
                    E = position(i, j)
                }
            }
        }

        function visit(p: Position) {
            visited[p.x][p.y] = true
        }

        function neighbours(p: Position) {
            const ne = [] as Position[]
            const n = matrix.length
            const m = matrix[0].length

            for (let d of [[1, 0], [-1, 0], [0, 1], [0, -1]]) {
                const x1 = p.x + d[0]
                const y1 = p.y + d[1]
                if (ibw(x1, 0, n - 1) && ibw(y1, 0, m - 1)) {
                    ne.push(position(x1, y1, p.steps + 1))
                }
            }

            return ne
        }

        const pq = new MinPriorityQueue<Position>((pos) => pos.steps)

        pq.push(E)

        while (pq.size() > 0) {
            let curr = pq.pop()

            if (visited[curr.x][curr.y]) continue

            visit(curr)

            if (matrix[curr.x][curr.y] == "a") return { curr }

            neighbours(curr).filter(nb => nb.z >= curr.z - 1).forEach(n => pq.push(n))
        }

        // return { matrix, S, E }

    }

}