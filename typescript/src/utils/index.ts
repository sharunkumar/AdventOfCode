import { EOL } from 'os';


export function sum(x: number, y: number): number {
    return x + y;
}

export function pipelog<T>(x: T): T {
    console.log(x)
    return x
}

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