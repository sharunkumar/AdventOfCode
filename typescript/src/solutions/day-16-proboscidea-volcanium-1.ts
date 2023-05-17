import { Solution, regexMatch } from "../utils";

export default class ProboscideaVolcanium extends Solution {
    solve(input: string) {
        let valves = new Map<string, number>()
        let tunnels = new Map<string, string[]>()
        this.get_lines(input)
            .map(line => regexMatch(line, /[A-Z0-9]+/g))
            .pipelog()
            .forEach(([_, valve, rate, ...targets]) => {
                valves.set(valve, Number(rate))
                tunnels.set(valve, targets)
            })

        console.log({ valves, tunnels })
    }
}