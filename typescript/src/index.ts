import { readFileSync, writeFileSync } from "fs";
import CalorieCounting from "./day-1-calorie-counting-2";
import RockPaperScissors from "./day-2-rock-paper-scissors-2";
import RucksackReorganization from "./day-3-rucksack-reorganization-2";
import CampCleanup from "./day-4-camp-cleanup-1";
import { Solution } from "./utils";

const input = readFileSync(__dirname + "/io/input.txt", "utf-8")

const solution: Solution = new CampCleanup()

const start = Date.now()

const output = solution.solve(input)

const end = Date.now()

console.log({ output })

console.debug("solution runtime: " + (end - start) + "ms")

writeFileSync(__dirname + "/io/output.txt", output.toString(), { encoding: "utf8" })