import { Solution } from "../utils";

export default class TuningTrouble extends Solution {
  solve(input: string) {
    let index = -1;
    let size = 14;

    for (let i = 0; i <= input.length - size; i++) {
      let slice = input.substring(i, i + size);

      if (slice.length == new Set(slice).size) {
        index = i;
        break;
      }
    }

    return index + size;
  }
}
