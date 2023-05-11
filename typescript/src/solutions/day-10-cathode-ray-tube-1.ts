import { Solution, pipelog } from "../utils";

let cycles = 0
let x = 1
let signal = 0

function increment_cycle() {
    cycles++
    if (is_qualifying_cycle()) {
        signal += cycles * x
        console.log(cycles, x)
    }
}

function is_qualifying_cycle() {
    return cycles >= 20 && (cycles - 20) % 40 == 0
}

class Instruction {
    static noop() {
        console.log("noop")
        increment_cycle()
    }

    static addx(num: number) {
        console.log("addx", num)
        increment_cycle()
        increment_cycle()
        x += num
    }
}


export default class CathodeRayTube extends Solution {
    solve(input: string) {
        this.get_lines(input)
            .map(line => line.split(" "))
            .map(command => {
                let func = command.shift()
                return [Reflect.get(Instruction, func + ""), ...command.map(parseInt)]
            })
            .map(([func, ...args]) => {
                func(...args)
            })

        return signal
    }
}