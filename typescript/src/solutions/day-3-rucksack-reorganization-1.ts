import { ascii_to_char, char_to_ascii, Solution, sum } from "../utils"

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

    intersect(one: string, two: string): string {
        return Array.from(one).filter(item => Array.from(two).includes(item))[0]
    }

    get_priority(char: string): number {
        let expr = char_to_ascii(char) - char_to_ascii('a') + 1

        if (expr < 1) {
            expr = char_to_ascii(char) - char_to_ascii('A') + 27
        }

        return expr
    }

    solve(input: string): any {
        return this.get_lines(input)
            .map(this.split_rucksack)
            .map(([one, two]) => this.intersect(one, two))
            .map(this.get_priority)
            .reduce(sum)
    }
}
