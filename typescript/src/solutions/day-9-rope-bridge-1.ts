import { pipelog, Solution } from "../utils";

class Position {
    constructor(public x: number, public y: number) { }

    is_around(other: Position): Boolean {
        return !(Math.abs(this.x - other.x) >= 2 || Math.abs(this.y - other.y) >= 2)
    }

    equals(other: Position): Boolean {
        return this.x == other.x && this.y == other.y
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

    move_head(move: Move) {
        for (let i = 0; i < move.count; i++) {
            switch (move.dir) {
                case "L":
                    this.head.x -= 1
                    if (!this.tail.is_around(this.head)) {
                        this.tail.y = this.head.y
                        this.tail.x = this.head.x + 1
                    }
                    break;
                case "R":
                    this.head.x += 1
                    if (!this.tail.is_around(this.head)) {
                        this.tail.y = this.head.y
                        this.tail.x = this.head.x - 1
                    }
                    break;
                case "U":
                    this.head.y += 1
                    if (!this.tail.is_around(this.head)) {
                        this.tail.x = this.head.x
                        this.tail.y = this.head.y - 1
                    }
                    break;
                case "D":
                    this.head.y -= 1
                    if (!this.tail.is_around(this.head)) {
                        this.tail.x = this.head.x
                        this.tail.y = this.head.y + 1
                    }
                    break;
                default:
                    break;
            }
            this.tail_states.add([this.tail.x, this.tail.y])
            // console.log({ dir: move.dir, head: this.head, tail: this.tail })
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
        // .map(pipelog)

        let state = new GameState(new Position(0, 0), new Position(0, 0))

        moves.map(m => state.move_head(m))
        // .map(pipelog)

        // console.log({ states: state.tail_states })

        let count = state.get_unique_tails()

        return count
    }
}
