import { ascending, ascii_to_char, char_to_ascii, Solution, sum } from "../utils"

export default class RucksackReorganization extends Solution {
    constructor() {
        super()
    }

    split_rucksack(items: string): string[] {
        return [
            items.slice(0, items.length / 2),
            items.slice(items.length / 2)
        ]
    }

    intersect<T>(one: Set<T>, two: Set<T>): Set<T> {
        return new Set(
            [...one].filter(x => two.has(x))
        )
    }

    get_priority(char: string): number {
        let expr = char_to_ascii(char) - char_to_ascii('a') + 1

        if (expr < 1) {
            expr = char_to_ascii(char) - char_to_ascii('A') + 27
        }

        return expr
    }

    solve(input: string): any {
        const sacks = this.get_lines(input)
            .map(str => Array.from(str).map(this.get_priority))
            .map(nums => new Set(nums))

        let result = 0

        for (let idx = 0; idx < sacks.length; idx += 3) {
            let sack1 = sacks[idx + 0]
            let sack2 = sacks[idx + 1]
            let sack3 = sacks[idx + 2]

            let [oop] = this.intersect(sack3, this.intersect(sack1, sack2))

            result += oop
        }

        return result
    }
}
