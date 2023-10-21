import { Solution } from "../utils";

export default class TuningTrouble extends Solution {
  solve(input: string) {
    let index = -1;

    for (let i = 0; i <= input.length - 4; i++) {
      let slice = input.substring(i, i + 4);

      if (slice.length == new Set(slice).size) {
        index = i;
        break;
      }
    }

    return index + 4;
  }
}
