import { EOL } from 'os';


export function sum(x: number, y: number): number {
    return x + y;
}

// export function pipelog<T>(x: T): T {
//     console.log(x)
//     return x
// }

export function char_to_ascii(char: string) {
    return char.charCodeAt(0)
}

export function ascii_to_char(ascii: number) {
    return String.fromCharCode(ascii)
}

export function ascending(a: number, b: number): number {
    return a - b
}

export function descending(a: number, b: number): number {
    return b - a
}

export function inclusive_between(x: number, start: number, end: number) {
    return start <= x && x <= end
}

export abstract class Solution {
    // define an abstract method that solves
    abstract solve(input: string): any
    get_lines(input: string): Array<string> {
        return input.split(EOL)
    }
    get_blocks(input: string): Array<string> {
        return input.split(`${EOL}${EOL}`)
    }
}

export function spreadMap<K, V>(input: Map<K, V>): Array<V> {
    return [...input].map(value => value[1])
}

export type ObjectValues<T> = T[keyof T]

export class FunctionLibrary {
    static get(name: string) {
        return Reflect.get(this, name)
    }
}

declare global {
    interface Array<T> {
        pipelog(): Array<T>;
        pipelog(include_index: boolean): Array<T>;
        pipelog(include_index: boolean, index_start: number): Array<T>;
        sum(): Number;
        flatten(): Array<T>;
    }
}

export const ascii_lowercase = "abcdefghijklmnopqrstuvwxyz"

Array.prototype.pipelog = function <T>(include_index: boolean = false, index_start: number = 0): Array<T> {
    this.map((x, idx) => {
        if (include_index)
            console.log(idx + index_start, x)
        else
            console.log(x)
        return x
    })
    return this as Array<T>;
};

Array.prototype.sum = function <T>(): number {
    return this.reduce(sum)
};

Array.prototype.flatten = function <T>(): Array<T> {
    return this.reduce((acc, curr) => acc.concat(curr), [] as T[]) as Array<T>;
};

export const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));