import { pipelog, Solution, sum } from "../utils";

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
}

export default class CampCleanup extends Solution {

    solve(input: string) {
        return this.get_lines(input)
            .map(str => str.split(","))
            .map(arr => [new Range(arr[0]), new Range(arr[1])])
            .filter(ranges => ranges[0].includes(ranges[1]) || ranges[1].includes(ranges[0]))
            .map(pipelog)
            .length
    }
}
