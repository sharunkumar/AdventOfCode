import { isNumberObject } from "util/types";
import { Solution, sum } from "../utils";

type Signal = Array<number | Signal>

export default class DistressSignal extends Solution {

    compare_signals(left: Signal, right: Signal): number {
        // console.log("comparing", { left, right })
        if (Number.isFinite(left) && !Number.isFinite(right)) {
            left = [left] as Signal
        }

        if (Number.isFinite(right) && !Number.isFinite(left)) {
            right = [right] as Signal
        }

        if (Number.isFinite(right) && Number.isFinite(left)) {
            if (left < right) return 1
            if (left == right) return 0
            return -1
        }


        let ll = left.length
        let rl = right.length

        let i = 0

        while (i < ll && i < rl) {
            let l = left[i] as Signal
            let r = right[i] as Signal
            let x = this.compare_signals(l, r)
            if (x == 1 || x == -1) return x
            i++
        }

        if (i == ll) {
            if (ll == rl) return 0
            return 1
        }

        return -1
    }

    solve(input: string) {
        let signals = this.get_blocks(input)
            .map(block => this.get_lines(block)
                .map(line => JSON.parse(line)) as [Signal, Signal])
            .map(sigs => this.compare_signals(sigs[0], sigs[1]))
            // .pipelog(true, 1)
            .map((x, idx) => x == 1 ? idx + 1 : 0)
            .sum()

        return { signals }
    }
}