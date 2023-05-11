import { Solution, pipelog } from "../utils";

class Instruction {
    static cycles = 0
    static x = 1
    static signal = 0
    static noop() {
        console.log("noop")
        Instruction.increment_cycle()
    }

    static addx(x: number) {
        console.log("addx", x)
        Instruction.increment_cycle()
        Instruction.increment_cycle()
        Instruction.x += x
    }
    static increment_cycle() {
        Instruction.cycles++
        if (Instruction.is_qualifying_cycle()) {
            Instruction.signal += Instruction.cycles * Instruction.x
            console.log(Instruction.cycles, Instruction.x)
        }
    }
    static is_qualifying_cycle() {
        return Instruction.cycles >= 20 && (Instruction.cycles - 20) % 40 == 0
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

        return Instruction.signal
    }
}