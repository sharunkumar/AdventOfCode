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
    constructor(public head: Position, public tail: Position) {
        this.tail_states = new Set<[number, number]>
    }

    tail_states: Set<[number, number]>

    get_unique_tails() {
        return new Set(Array.from(this.tail_states).map(a => `${a[0]},${a[1]}`)).size
    }

    move_head(move: MoveD) {
        for (let i = 0; i < move.count; i++) {
            this.head.x += move.dx;
            this.head.y += move.dy;

            if (!this.tail.is_around(this.head)) {
                let tdx = this.head.x == this.tail.x ? 0 : (this.head.x - this.tail.x) / Math.abs(this.head.x - this.tail.x)
                let tdy = this.head.y == this.tail.y ? 0 : (this.head.y - this.tail.y) / Math.abs(this.head.y - this.tail.y)

                this.tail.x += tdx;
                this.tail.y += tdy;
            }

            this.tail_states.add([this.tail.x, this.tail.y])
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

        let state = new GameState(new Position(0, 0), new Position(0, 0))

        moves.map(m => state.move_head(m))

        let count = state.get_unique_tails()

        return count
    }
}
