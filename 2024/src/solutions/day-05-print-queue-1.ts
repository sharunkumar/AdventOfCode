import { Solution } from "#/utils";

export default class PrintQueue extends Solution {
  solve(input: string) {
    const [rulesSection, updatesSection] = this.get_blocks(input);
    const rules = this.get_lines(rulesSection).map((rule) =>
      rule.split("|").map(Number)
    );
    const updates = this.get_lines(updatesSection).map((update) =>
      update.split(",").map(Number)
    );

    const isCorrectOrder = (update: number[]) => {
      for (const [x, y] of rules) {
        const indexX = update.indexOf(x);
        const indexY = update.indexOf(y);
        if (indexX !== -1 && indexY !== -1 && indexX > indexY) {
          return false;
        }
      }
      return true;
    };

    const correctUpdates = updates.filter(isCorrectOrder);
    const middlePages = correctUpdates.map(
      (update) => update[Math.floor(update.length / 2)]
    );
    const result = middlePages.reduce((sum, page) => sum + page, 0);

    return result;
  }
}
