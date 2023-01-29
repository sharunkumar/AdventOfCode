export abstract class Solution {
    // define an abstract method that solves
    abstract solve(input: string): any
}

import { readFileSync, writeFileSync } from "fs";
import CalorieCounting from "./day-1-calorie-counting-2";

const input = readFileSync(__dirname + "/io/input.txt", "utf-8")

const solution: Solution = new CalorieCounting()

const output = solution.solve(input)

console.log({ output })

writeFileSync(__dirname + "/io/output.txt", output.toString())