export abstract class Solution {
    // define an abstract method that solves
    abstract solve(input: string): string
}

import { readFileSync, writeFileSync } from "fs";
import CalorieCounting from "./day-1-calorie-counting";

const input = readFileSync(__dirname + "/io/input.txt", "utf-8")

const solution: Solution = new CalorieCounting()

const output = solution.solve(input)

writeFileSync(__dirname + "/io/output.txt", output)