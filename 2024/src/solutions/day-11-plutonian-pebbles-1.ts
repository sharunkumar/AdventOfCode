import { Solution } from "#/utils";

export default class PlutonianPebbles extends Solution {
  solve(input: string) {
    let stones = input.trim().split(/\s+/).map(Number);

    for (let blink = 0; blink < 25; blink++) {
      const newStones: number[] = [];

      for (const stone of stones) {
        if (stone === 0) {
          newStones.push(1);
        } else {
          const digits = stone.toString();
          if (digits.length % 2 === 0) {
            const mid = Math.floor(digits.length / 2);
            const left = parseInt(digits.slice(0, mid));
            const right = parseInt(digits.slice(mid));
            newStones.push(left, right);
          } else {
            newStones.push(stone * 2024);
          }
        }
      }

      stones = newStones;
    }

    return stones.length;
  }
}
