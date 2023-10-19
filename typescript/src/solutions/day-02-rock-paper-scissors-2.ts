import { Solution, sum } from "../utils";

enum play {
  rock,
  paper,
  scissors,
}

enum outcome {
  loss = 0,
  draw = 3,
  win = 6,
}

export default class RockPaperScissors extends Solution {
  parse_outcome(letter: string): outcome {
    switch (letter) {
      case "X":
        return outcome.loss;
      case "Y":
        return outcome.draw;
      case "Z":
        return outcome.win;
      default:
        throw new Error("Can't parse");
    }
  }
  parse_play(letter: string): play {
    switch (letter) {
      case "A":
        return play.rock;
      case "B":
        return play.paper;
      case "C":
        return play.scissors;
      default:
        throw new Error("Can't parse");
    }
  }

  get_outcome(left: play, right: play): outcome {
    let length = Object.values(play).length / 2;

    if (left == right) {
      return outcome.draw;
    }

    if (right == (left + 1) % length) {
      return outcome.win;
    }

    return outcome.loss;
  }

  get_play(left: play, right: outcome): play {
    let length = Object.values(play).length / 2;

    switch (right) {
      case outcome.draw:
        return left;
      case outcome.win:
        return (left + 1) % length;
      case outcome.loss:
        return (left - 1 + length) % length;
      default:
        throw new Error("Unexpected");
    }
  }

  solve(input: string) {
    return this.get_lines(input)
      .map((line) => line.split(" "))
      .map((arr) => [
        this.parse_play(arr[0]).valueOf(),
        this.parse_outcome(arr[1]).valueOf(),
      ])
      .map(([play, outcome]) => this.get_play(play, outcome) + outcome + 1)
      .reduce(sum);
  }
}
