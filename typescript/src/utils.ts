
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

export abstract class Solution {
    // define an abstract method that solves
    abstract solve(input: string): any
    get_lines(input: string): Array<string> {
        return input.split("\r\n")
    }
}