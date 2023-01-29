import { readFileSync, writeFileSync } from "fs";
import CalorieCounting from "./solutions/day-1-calorie-counting-2";
import RockPaperScissors from "./solutions/day-2-rock-paper-scissors-2";
import RucksackReorganization from "./solutions/day-3-rucksack-reorganization-2";
import CampCleanup from "./solutions/day-4-camp-cleanup-2";
import { Solution } from "./utils";

const input = readFileSync(__dirname + "/io/input.txt", "utf-8")

const solution: Solution = new CalorieCounting()

const start = Date.now()

const output = solution.solve(input)

const end = Date.now()

console.debug({ output })

console.debug("solution runtime: " + (end - start) + "ms")

// writeFileSync(__dirname + "/io/output.txt", output.toString(), { encoding: "utf8" })