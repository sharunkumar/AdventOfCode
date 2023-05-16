import { Solution, sum } from "../utils";

type Signal = Array<number | Signal>

export default class DistressSignal extends Solution {

    compare_signals(left: Signal, right: Signal): number {
        console.log("comparing", { left, right })
        let ll = left.length
        let rl = right.length

        let i = 0

        for (i = 0; i < Math.min(ll, rl); i++) {
            let l = left[i] as Signal
            let r = right[i] as Signal
            if (Number.isFinite(l) && Number.isFinite(r)) {
                if (l == r) continue
                else {
                    if (l < r) return -1
                    else return 1
                }
            }
            else if (Array.isArray(l) && Array.isArray(r)) {
                let result = this.compare_signals(l, r)
                if (result == 0) continue
                else return result
            }
            else {
                if (Number.isFinite(l)) {
                    let result = this.compare_signals([l] as Signal, r)
                    if (result == 0) continue
                    else return result
                } else if (Number.isFinite(r)) {
                    let result = this.compare_signals(l, [r] as Signal)
                    if (result == 0) continue
                    else return result
                }
            }
        }

        console.log({ i })
        if (i == rl && ll != rl) { return 1 }
        return -1
    }

    solve(input: string) {
        let signals = this.get_blocks(input)
            .map(block => this.get_lines(block)
                .map(line => JSON.parse(line)) as [Signal, Signal])
            .map((sigs, idx) => this.compare_signals(sigs[0], sigs[1]))
            .pipelog(true, 1)
            .map((x, idx) => x == -1 ? idx + 1 : 0)
            .sum()

        return { signals }
    }
}