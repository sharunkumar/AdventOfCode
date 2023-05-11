import { Solution, pipelog } from "../utils";

export default class CathodeRayTube extends Solution {
    solve(input: string) {
        this.get_lines(input)
            .map(pipelog)
    }
}