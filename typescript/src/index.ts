export abstract class Solution {
    // define an abstract method that solves
    abstract solve(input: string): any
    get_lines(input: string): Array<string> {
        return input.split("\r\n")
    }
}

export function sum(x: number, y: number): number {
    return x + y
}

import { readFileSync, writeFileSync } from "fs";
import CalorieCounting from "./day-1-calorie-counting-2";
import RockPaperScissors from "./day-2-rock-paper-scissors-2";

const input = readFileSync(__dirname + "/io/input.txt", "utf-8")

const solution: Solution = new RockPaperScissors()

const output = solution.solve(input)

console.log({ output })

writeFileSync(__dirname + "/io/output.txt", output.toString())