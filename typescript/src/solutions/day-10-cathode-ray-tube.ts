import { Solution, pipelog } from "../utils";

class I {
    static cycles = 0
    static x = 1
    static signal = 0
    static noop() {
        console.log("noop")
        I.increment_cycle()
    }

    static addx(x: number) {
        console.log("addx", x)
        I.increment_cycle()
        I.increment_cycle()
        I.x += x
    }
    static increment_cycle() {
        I.cycles++
        if (I.is_qualifying_cycle()) {
            I.signal += I.cycles * I.x
            console.log(I.cycles, I.x)
        }
    }
    static is_qualifying_cycle() {
        return I.cycles >= 20 && (I.cycles - 20) % 40 == 0
    }
}


export default class CathodeRayTube extends Solution {
    solve(input: string) {
        this.get_lines(input)
            .map(line => line.split(" "))
            .map(command => {
                let func = command.shift()
                return [Reflect.get(I, func + ""), ...command.map(parseInt)]
            })
            .map(([func, ...args]) => {
                func(...args)
            })

        return I.signal
    }
}