import { inclusive_between, pipelog, Solution, sum } from "../utils";

class Range extends Object {
    start: number;
    end: number;
    constructor(range: string) {
        super()
        let splits = range.split("-")
        this.start = parseInt(splits[0])
        this.end = parseInt(splits[1])
    }

    includes(other: Range): boolean {
        return this.start <= other.start && this.end >= other.end
    }

    overlaps(other: Range): boolean {
        return inclusive_between(this.start, other.start, other.end)
            || inclusive_between(this.end, other.start, other.end)
            || inclusive_between(other.start, this.start, this.end)
            || inclusive_between(other.end, this.start, this.end)
    }
}

export default class CampCleanup extends Solution {

    solve(input: string) {
        return this.get_lines(input)
            .map(str => str.split(","))
            .map(arr => [new Range(arr[0]), new Range(arr[1])])
            .filter(([one, two]) => one.overlaps(two))
            // .map(pipelog)
            .length
    }
}
