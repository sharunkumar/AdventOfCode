import { Point, Solution } from "../utils";
import { LoopingIterator } from "../utils/iterator";
import { Rock, chamber } from "./modals/day-17";

export default class PyroclasticFlow extends Solution {
    solve(input: string) {

        let [stream, ...rocks_raw] = this.get_blocks(input)

        let rocks = rocks_raw.map(this.get_lines.bind(this)).map(r => new Rock(r))

        let chamber_width = 7
        let chamber_height = 6000
        let chamber_floor = chamber_height - 1
        let height = 0

        let chamber = {} as chamber

        let inputs = { part1: 2022, part2: 1000000000000 } as const

        chamber.length = chamber_height

        for (let i = 0; i < chamber_height; i++) {
            let arr = []
            for (let j = 0; j < chamber_width; j++) {
                arr.push(".")
            }
            chamber[i] = arr
        }

        let iter_rocks = new LoopingIterator(rocks)
        let iter_jets = new LoopingIterator([...stream])

        // loop n times
        while (iter_rocks.count < inputs.part1) {
            // rock appears
            let current_rock = iter_rocks.next()
            let rock_appear_position_y = chamber_floor - 2 - current_rock.height
            let rock_appear_position_x = 2

            const pos = new Point(rock_appear_position_x, rock_appear_position_y)

            do {
                // jet the rock
                let jet = iter_jets.next()

                if (jet == ">") {
                    if (can_move_right(current_rock, pos, chamber)) {
                        pos.x++
                    } else {
                    }
                } else if (jet == "<") {
                    if (can_move_left(current_rock, pos, chamber)) {
                        pos.x--
                    } else {
                    }
                }
                // move rock down
                if (rock_can_move(current_rock, pos, chamber)) {
                    pos.y++
                }
                else {
                    break
                }
            } while (true)

            // settle the rock
            set_rock(current_rock, chamber, pos)

            chamber_floor = Math.min(pos.y - 1, chamber_floor)

            height = chamber.length - chamber_floor - 1
            // print(chamber, chamber_floor)
        }

        return { height }
    }
}

function print(chamber: chamber, starting: number = 0) {
    // console.clear()
    for (let i = starting; i < chamber.length; i++) {
        const l = chamber[i];
        console.log(l.join(""))
    }
}

function rock_can_move(rock: Rock, position: Point, chamber: chamber): boolean {
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
function set_rock(rock: Rock, chamber: chamber, pos: Point) {
    rock.rows.forEach((row, y) => {
        [...row].forEach((c, x) => {
            chamber[pos.y + y][pos.x + x] = (c == "#" ? c : chamber[pos.y + y][pos.x + x])
        })
    })
}

function can_move_right(rock: Rock, position: Point, chamber: chamber): boolean {
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

function can_move_left(rock: Rock, position: Point, chamber: chamber): boolean {
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

