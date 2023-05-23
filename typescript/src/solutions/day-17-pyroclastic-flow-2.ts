import { Point, Solution } from "../utils";
import { LoopingIterator } from "../utils/iterator";
import { Rock } from "./modals/day-17";

export default class PyroclasticFlow extends Solution {
    solve(input: string) {

        let [stream, ...rocks_raw] = this.get_blocks(input)

        let rocks = rocks_raw.map(this.get_lines.bind(this)).map(r => new Rock(r))

        let chamber_width = 7
        let chamber_height = 60000
        let chamber_floor = chamber_height - 1
        let height = 0

        let chamber = [] as string[][]

        interface height_rock {
            height: number,
            rock: number
        }

        let height_map = new Map<string, height_rock[]>()
        let skipped_height = 0

        for (let i = 0; i < chamber_height; i++) {
            let arr = []
            for (let j = 0; j < chamber_width; j++) {
                arr.push(".")
            }
            chamber.push(arr)
        }

        let iter_rocks = new LoopingIterator(rocks)
        let iter_jets = new LoopingIterator([...stream])

        let rock_lim = 1000000000000;
        let repeat_processed = false
        // loop n times
        while (iter_rocks.count < rock_lim) {
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

            if (!repeat_processed) {
                let str = chamber.slice(chamber_floor + 1, chamber_floor + 20).flat().join("")

                // console.log({ str })

                let key = `${iter_jets.index}|${str}`

                const val = height_map.get(key);
                // console.log({ key })

                if (!val) {
                    height_map.set(key, [{
                        height: height,
                        rock: iter_rocks.count
                    }])
                } else {
                    val.push({
                        height: height,
                        rock: iter_rocks.count
                    })
                    if (val.length == 3) {
                        let [first, second, third] = val
                        let repeat_height = third.height - second.height
                        if (repeat_height == second.height - first.height) {
                            const skip_unit = third.rock - second.rock;
                            console.log("repeat found!", height, repeat_height, skip_unit)

                            while (iter_rocks.count + skip_unit < rock_lim) {
                                iter_rocks.skip(skip_unit)
                                skipped_height += repeat_height
                            }

                            repeat_processed = true
                        }
                    }
                }
            }
        }

        console.log(iter_rocks.count)

        return { height: height + skipped_height }
    }
}

function print(chamber: string[][], starting: number = 0) {
    // console.clear()
    for (let i = starting; i < chamber.length; i++) {
        const l = chamber[i];
        console.log(l.join(""))
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

