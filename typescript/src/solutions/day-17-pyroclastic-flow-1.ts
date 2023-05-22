import { Point, Solution } from "../utils";
import { Rock } from "./modals/Rock";

export default class PyroclasticFlow extends Solution {
    solve(input: string) {

        let [stream, ...rocks_raw] = this.get_blocks(input)

        let rocks = rocks_raw.map(this.get_lines.bind(this)).map(r => new Rock(r))
        // .pipelog()

        console.log({ stream })

        rocks.forEach((x, idx) => console.log(idx, x.surface_vector_left()))

        // console.log({ surface: rocks[0].surface_vector() })

        let chamber_width = 7
        let chamber_height = 6000
        let chamber_floor = chamber_height - 1

        let chamber = [] as string[][]

        for (let i = 0; i < chamber_height; i++) {
            let arr = []
            for (let j = 0; j < chamber_width; j++) {
                arr.push(".")
            }
            chamber.push(arr)
        }

        let iter_rocks = new LoopingIterator(rocks)
        let iter_jets = new LoopingIterator([...stream])


        // loop n times
        while (iter_rocks.count < 2022) {
            // rock appears
            // console.log({ chamber_floor })
            let current_rock = iter_rocks.next()
            let rock_appear_position_y = chamber_floor - 2 - current_rock.height
            // console.log({ rock_appear_position_y })
            let rock_appear_position_x = 2

            const pos = new Point(rock_appear_position_x, rock_appear_position_y)

            do {
                // jet the rock
                let jet = iter_jets.next()

                if (jet == ">") {
                    if (can_move_right(current_rock, pos, chamber)) {
                        pos.x++
                        // console.log("rock pushed right")
                    } else {
                        // console.log("rock pushed right, nothing happens")
                    }
                } else if (jet == "<") {
                    if (can_move_left(current_rock, pos, chamber)) {
                        pos.x--
                        // console.log("rock pushed left")
                    } else {
                        // console.log("rock pushed left, nothing happens")
                    }
                }
                // move rock down
                if (rock_can_move(current_rock, pos, chamber)) {
                    pos.y++
                    // console.log("rock moved down")
                }
                else {
                    break
                }
            } while (true)

            // settle the rock
            set_rock(current_rock, chamber, pos)
            // console.log("rock rest")

            chamber_floor = Math.min(pos.y - 1, chamber_floor)

            // print(chamber, chamber_floor)
        }


        // // while (rock has space below):
        // //   rock pushed by jet
        // //   rock moves one step down

        // // solidify the rock

        return { height: chamber.length - chamber_floor - 1 }
    }
}

function print(chamber: string[][], starting: number = 0) {
    // console.clear()
    for (let i = starting; i < chamber.length; i++) {
        const l = chamber[i];
        console.log(l.join(""))
    }
}

class LoopingIterator<T> {
    index: number;
    count: number;
    constructor(public array: T[]) {
        this.index = -1
        this.count = 0
    }

    next() {
        this.index = (this.index + 1) % this.array.length
        this.count++
        return this.array[this.index]
    }
}

function rock_can_move(rock: Rock, position: Point, chamber: string[][]): boolean {
    const rownum = position.y + rock.height;

    if (rownum >= chamber.length) {
        return false
    }

    let vec = rock.surface_vector_bottom()

    for (let i = 0; i < vec.length; i++) {
        const v = vec[i];

        if (chamber[rownum + v][position.x + i] != ".") {
            return false
        }
    }

    return true
}
function set_rock(rock: Rock, chamber: string[][], pos: Point) {
    rock.rows.forEach((row, y) => {
        [...row].forEach((c, x) => {
            chamber[pos.y + y][pos.x + x] = (c == "#" ? c : chamber[pos.y + y][pos.x + x])
        })
    })
}

function can_move_right(rock: Rock, position: Point, chamber: string[][]): boolean {
    const colnum = position.x + rock.width;
    if (colnum >= chamber[0].length)
        return false

    let vec = rock.surface_vector_right()

    for (let i = 0; i < vec.length; i++) {
        const v = vec[i];

        if (chamber[position.y + i][colnum + v] != ".") {
            return false
        }
    }

    return true;
}

function can_move_left(rock: Rock, position: Point, chamber: string[][]): boolean {
    const colnum = position.x - 1;
    if (colnum < 0)
        return false

    let vec = rock.surface_vector_left()

    for (let i = 0; i < vec.length; i++) {
        const v = vec[i];

        if (chamber[position.y + i][colnum + v] != ".") {
            return false
        }
    }

    return true;
}

