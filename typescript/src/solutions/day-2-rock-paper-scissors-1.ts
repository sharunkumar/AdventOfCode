import { Solution, sum } from "../utils";

enum play {
    rock,
    paper,
    scissors
}

enum outcome {
    loss = 0,
    draw = 3,
    win = 6
}

export default class RockPaperScissors extends Solution {

    parse_raw(letter: string): play {
        switch (letter) {
            case "A":
            case "X":
                return play.rock;
            case "B":
            case "Y":
                return play.paper;
            case "C":
            case "Z":
                return play.scissors;
            default:
                throw new Error("Can't parse");

        }
    }

    get_outcome(left: play, right: play): outcome {
        let length = Object.values(play).length / 2

        if (left == right) {
            return outcome.draw
        }

        if (right == (left + 1) % length) {
            return outcome.win
        }

        return outcome.loss

    }

    solve(input: string) {
        return this.get_lines(input)
            .map(line => line.split(" "))
            .map(arr => arr.map(item => this.parse_raw(item)))
            .map(plays => this.get_outcome(plays[0], plays[1]) + plays[1] + 1)
            .reduce(sum)
    }

}