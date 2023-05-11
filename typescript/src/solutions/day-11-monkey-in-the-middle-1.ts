import { Solution, pipelog } from "../utils";

export class MonkeyInTheMiddle extends Solution {
    solve(input: string) {
        this.get_blocks(input)
            .map(pipelog)
    }

}