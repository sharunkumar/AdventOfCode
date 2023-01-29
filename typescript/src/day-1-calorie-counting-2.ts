import { Solution } from ".";

export default class CalorieCounting extends Solution {
    solve(input: string): any {
        const [a, b, c, ..._] = input.split("\r\n\r\n")
            .map(item => item.split("\r\n"))
            .map(item_aray => item_aray.map(item =>
                parseFloat(item))
                .reduce((prev, next) => prev + next)
            )
            .sort((a, b) => b - a)

        return a + b + c
    }
}
