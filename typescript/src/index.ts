import { existsSync, readFileSync, writeFileSync } from "fs";
import path from "path";
import CalorieCounting from "./solutions/day-1-calorie-counting-2";
import RockPaperScissors from "./solutions/day-2-rock-paper-scissors-2";
import RucksackReorganization from "./solutions/day-3-rucksack-reorganization-2";
import CampCleanup from "./solutions/day-4-camp-cleanup-2";
import SupplyStacks from "./solutions/day-5-supply-stacks-2";
import TuningTrouble from "./solutions/day-6-tuning-trouble-1";
import { Solution } from "./utils";

const solution: Solution = new TuningTrouble()

const input_file_name = path.join(__dirname, "io", `${solution.constructor.name}.txt`)

if (!existsSync(input_file_name)) {
    writeFileSync(input_file_name, "", "utf-8")
    console.debug(`${input_file_name} created.`)
}

const input = readFileSync(input_file_name, "utf-8")

if (input == "") {
    console.debug(`add input to ${input_file_name} to continue.`)
    process.exit(0)
}

const start = Date.now()

const output = solution.solve(input)

const end = Date.now()

console.debug({ output })

console.debug("solution runtime: " + (end - start) + "ms")

// writeFileSync(__dirname + "/io/output.txt", output.toString(), { encoding: "utf8" })