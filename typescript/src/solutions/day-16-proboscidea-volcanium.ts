import { Solution } from "../utils";

export default class ProboscideaVolcanium extends Solution {
    solve(input: string) {
        this.get_lines(input).pipelog()
    }
}