import { EOL } from "node:os";

export abstract class Solution {
  abstract solve(input: string): unknown;
  get_lines(input: string): Array<string> {
    return input.split(EOL);
  }
  get_blocks(input: string): Array<string> {
    return input.split(`${EOL}${EOL}`);
  }
  get_matrix(input: string): Array<Array<string>> {
    return this.get_lines(input).map((line) => line.split(""));
  }
  get_matrix_numbers(input: string): Array<Array<number>> {
    return this.get_lines(input).map((line) =>
      regexMatch(line, /(\d+)/g).map((n) => parseInt(n))
    );
  }
  print_matrix(matrix: (string | number)[][]) {
    matrix.map((line) => line.join("")).pipelog();
  }
}

export function sum(x: number, y: number): number {
  return x + y;
}

export function least(x: number, y: number): number {
  return Math.min(x, y);
}

export function greatest(x: number, y: number): number {
  return Math.max(x, y);
}

export function product(x: number, y: number): number {
  return x * y;
}

// export function pipelog<T>(x: T): T {
//     console.log(x)
//     return x
// }

export function char_to_ascii(char: string) {
  return char.charCodeAt(0);
}

export function ascii_to_char(ascii: number) {
  return String.fromCharCode(ascii);
}

export function ascending(a: number, b: number): number {
  return a - b;
}

export function descending(a: number, b: number): number {
  return b - a;
}

export function inclusive_between(x: number, start: number, end: number) {
  return start <= x && x <= end;
}

export function spreadMap<K, V>(input: Map<K, V>): Array<V> {
  return [...input].map((value) => value[1]);
}

export type ObjectValues<T> = T[keyof T];

export class FunctionLibrary {
  static get(name: string) {
    return Reflect.get(this, name);
  }
}

declare global {
  interface Array<T> {
    pipelog(): Array<T>;
    pipelog(include_index: boolean): Array<T>;
    pipelog(include_index: boolean, index_start: number): Array<T>;
    sum(): number;
    product(): number;
    least(): number;
    greatest(): number;
  }
}

export const ascii_lowercase = "abcdefghijklmnopqrstuvwxyz";

Array.prototype.pipelog = function <T>(
  include_index = false,
  index_start = 0
): Array<T> {
  this.map((x, idx) => {
    if (include_index) console.log(idx + index_start, x);
    else console.log(x);
    return x;
  });
  return this as Array<T>;
};

Array.prototype.sum = function <T>(): number {
  return this.reduce(sum);
};

Array.prototype.least = function <T>(): number {
  return this.reduce(least);
};

Array.prototype.greatest = function <T>(): number {
  return this.reduce(greatest);
};

Array.prototype.product = function <T>(): number {
  return this.reduce(product);
};

export const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

export function manhattan_distance(
  x1: number,
  y1: number,
  x2: number,
  y2: number
) {
  return Math.abs(x1 - x2) + Math.abs(y1 - y2);
}

export function regexMatch(input: string, re: RegExp) {
  return [...input.matchAll(re)].map((match) => match[0]);
}

export function intersect<T>(one: Set<T>, two: Set<T>): Set<T> {
  return new Set([...one].filter((x) => two.has(x)));
}

export function numberc(str: string): number | string {
  if (!Number.isNaN(Number(str))) {
    return Number(str);
  }
  return str;
}

export function safe_get<T>(
  matrix: T[][],
  x: number,
  y: number
): T | undefined {
  try {
    return matrix[x][y];
  } catch (_) {}
}

export const range = (n: number): number[] => [...Array(n).keys()];

export function gcd(a: number, b: number): number {
  return !b ? a : gcd(b, a % b);
}

export function lcm(a: number, b: number) {
  return (a * b) / gcd(a, b);
}

export class Counter<T> {
  private counts: Map<T, number> = new Map<T, number>();

  constructor(items?: T[]) {
    if (items) {
      this.update(items);
    }
  }

  update(items: T[]): void {
    for (const item of items) {
      this.increment(item);
    }
  }

  increment(item: T): void {
    const count = this.counts.get(item) ?? 0;
    this.counts.set(item, count + 1);
  }

  decrement(item: T): void {
    const count = this.counts.get(item) ?? 0;
    if (count <= 1) {
      this.counts.delete(item);
    } else {
      this.counts.set(item, count - 1);
    }
  }

  getCount(item: T): number {
    return this.counts.get(item) ?? 0;
  }

  getItems(): T[] {
    return Array.from(this.counts.keys());
  }

  getCounts(): number[] {
    return Array.from(this.counts.values());
  }

  getEntries(): [T, number][] {
    return Array.from(this.counts.entries());
  }
}
