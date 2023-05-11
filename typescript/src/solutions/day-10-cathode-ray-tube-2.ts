import { Solution, pipelog } from "../utils";

let cycles = 0
let x = 1
let signal = 0
let buffer = ""

function is_x_in_sprite() {
    return [x - 1, x, x + 1].includes(buffer.length)
}

function increment_cycle() {
    buffer += is_x_in_sprite() ? "#" : "."
    cycles++
    if (is_qualifying_cycle()) {
        signal += cycles * x
        // console.log(cycles, x)
        console.log({ buffer })
        buffer = ""
    }
}

function is_qualifying_cycle() {
    return cycles % 40 == 0
}

class Instruction {
    static noop() {
        // console.log("noop")
        increment_cycle()
    }

    static addx(num: number) {
        // console.log("addx", x)
        increment_cycle()
        increment_cycle()
        x += num
    }
}


export default class CathodeRayTube extends Solution {
    solve(input: string) {
        this.get_lines(input)
            .map(line => line.split(" "))
            .map(command => [Reflect.get(Instruction, command.shift() + ""), ...command.map(parseInt)])
            .map(([func, ...args]) => func(...args))

        return signal
    }
}