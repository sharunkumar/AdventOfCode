import { Solution } from "#/utils";

export default class PlutonianPebbles extends Solution {
  private cache = new Map<string, number>();

  private count(stone: number, steps: number): number {
    const key = `${stone},${steps}`;
    if (this.cache.has(key)) {
      return this.cache.get(key)!;
    }

    if (steps === 0) {
      return 1;
    }

    if (stone === 0) {
      const result = this.count(1, steps - 1);
      this.cache.set(key, result);
      return result;
    }

    const string = stone.toString();
    const length = string.length;

    let result: number;
    if (length % 2 === 0) {
      const firstHalf = parseInt(string.slice(0, length / 2));
      const secondHalf = parseInt(string.slice(length / 2));
      result =
        this.count(firstHalf, steps - 1) + this.count(secondHalf, steps - 1);
    } else {
      result = this.count(stone * 2024, steps - 1);
    }

    this.cache.set(key, result);
    return result;
  }

  solve(input: string) {
    const stones = input.split(/\s+/).map(Number);
    return stones.reduce((sum, stone) => sum + this.count(stone, 75), 0);
  }
}
