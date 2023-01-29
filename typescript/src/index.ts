import { readFileSync, writeFileSync } from "fs";
import CalorieCounting from "./day-1-calorie-counting-2";
import RockPaperScissors from "./day-2-rock-paper-scissors-2";
import RucksackReorganization from "./day-3-rucksack-reorganization-1";
import { Solution } from "./utils";

const input = readFileSync(__dirname + "/io/input.txt", "utf-8")

const solution: Solution = new RucksackReorganization()

const output = solution.solve(input)

console.log({ output })

writeFileSync(__dirname + "/io/output.txt", output.toString(), { encoding: "utf8" })