import { descending, Solution, sum } from "./utils";

export default class CalorieCounting extends Solution {
    solve(input: string): any {
        const [a, b, c, ..._] = input.split("\r\n\r\n")
            .map(item => item.split("\r\n"))
            .map(item_aray => item_aray.map(item =>
                parseFloat(item))
                .reduce(sum)
            )
            .sort(descending)

        return a + b + c
    }
}
