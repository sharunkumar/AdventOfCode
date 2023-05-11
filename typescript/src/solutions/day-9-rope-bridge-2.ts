import { Solution } from "../utils";

class Position {
    constructor(public x: number, public y: number) { }

    is_around(other: Position): Boolean {
        return Math.abs(this.x - other.x) <= 1 && Math.abs(this.y - other.y) <= 1
    }

    equals(other: Position): Boolean {
        return this.x == other.x && this.y == other.y
    }
}

class MoveD {
    public dx: number = 0;
    public dy: number = 0;
    public count: number;
    constructor(mv: Move) {
        this.count = mv.count
        switch (mv.dir) {
            case "L":
                this.dx = -1
                break;
            case "R":
                this.dx = 1
                break;
            case "U":
                this.dy = 1
                break;
            case "D":
                this.dy = -1
                break;
        }
    }
}

class GameState {
    knots: Position[];
    constructor(public knots_count: number = 2) {
        this.knots = [] as Position[]

        for (let i = 0; i < knots_count; i++) {
            this.knots.push(new Position(0, 0))
        }

        this.tail_states = new Set<[number, number]>
    }

    tail_states: Set<[number, number]>

    get_unique_tails() {
        return new Set(Array.from(this.tail_states).map(a => `${a[0]},${a[1]}`)).size
    }

    move_head(move: MoveD) {
        let head = this.knots[0]
        for (let i = 0; i < move.count; i++) {
            head.x += move.dx;
            head.y += move.dy;

            let ti = 1
            do {
                let tail = this.knots[ti]
                let head = this.knots[ti - 1]
                if (!tail.is_around(this.knots[ti - 1])) {
                    let tdx = head.x == tail.x ? 0 : (head.x - tail.x) / Math.abs(head.x - tail.x)
                    let tdy = head.y == tail.y ? 0 : (head.y - tail.y) / Math.abs(head.y - tail.y)

                    tail.x += tdx;
                    tail.y += tdy;
                }

                if (tail == this.knots[this.knots.length - 1]) {
                    this.tail_states.add([tail.x, tail.y])
                    break
                } else {
                    ti++
                }
            } while (true)
        }
    }
}

class Move {
    constructor(public dir: string, public count: number) { }
}

export default class RopeBridge extends Solution {

    solve(input: string) {
        let moves = this.get_lines(input)
            .map(line => line.split(" "))
            .map(arr => new Move(arr[0], parseInt(arr[1])))
            .map(mv => new MoveD(mv))

        let state = new GameState(10)

        moves.map(m => state.move_head(m))

        let count = state.get_unique_tails()

        return count
    }
}
