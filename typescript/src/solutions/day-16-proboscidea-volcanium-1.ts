import { Solution, regexMatch } from "../utils";

type valve = string
interface distance { [key: valve]: { [key: valve]: number } }
interface valves { [key: valve]: number }
interface tunnels { [key: valve]: valve[] }

export default class ProboscideaVolcanium extends Solution {
    solve(input: string) {

        let valves: valves = {}
        let tunnels: tunnels = {}
        let dist: distance = {}
        let nonempty = [] as valve[]
        this.get_lines(input)
            .map(line => regexMatch(line, /[A-Z0-9]+/g))
            .forEach(([_, valve, rate, ...targets]) => {
                valves[valve] = Number(rate)
                tunnels[valve] = targets
            })

        for (let x in valves) {
            console.log({ x, v: valves[x] })
        }
    }
}