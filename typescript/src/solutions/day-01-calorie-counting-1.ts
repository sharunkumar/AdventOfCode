import { Solution, sum } from "../utils";

export default class CalorieCounting extends Solution {
  solve(input: string): any {
    var max_calories = this.get_blocks(input)
      .map((item) => item.split("\r\n"))
      .map((item_aray) => item_aray.map((item) => parseFloat(item)).reduce(sum))
      .reduce((prev, next) => Math.max(prev, next));

    return max_calories;
  }
}
