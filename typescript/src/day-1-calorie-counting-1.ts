import { Solution, sum } from ".";

export default class CalorieCounting extends Solution {
    solve(input: string): any {
        var max_calories = input.split("\r\n\r\n")
            .map(item => item.split("\r\n"))
            .map(item_aray => item_aray.map(item =>
                parseFloat(item))
                .reduce(sum)
            )
            .reduce((prev, next) => Math.max(prev, next))

        return max_calories
    }
}
