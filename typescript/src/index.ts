import { existsSync, readFileSync, writeFileSync } from "fs";
import { Solution } from "./utils";
import path from "path";
import CalorieCounting from "./solutions/day-1-calorie-counting-2";
import RockPaperScissors from "./solutions/day-2-rock-paper-scissors-2";
import RucksackReorganization from "./solutions/day-3-rucksack-reorganization-2";
import CampCleanup from "./solutions/day-4-camp-cleanup-2";
import SupplyStacks from "./solutions/day-5-supply-stacks-2";
import TuningTrouble from "./solutions/day-6-tuning-trouble-2";
import NoSpaceLeftOnDevice from "./solutions/day-7-no-space-left-on-device-2";
import TreetopTreeHouse from "./solutions/day-8-treetop-tree-house-2";
import RopeBridge from "./solutions/day-9-rope-bridge-2";
import CathodeRayTube from "./solutions/day-10-cathode-ray-tube-2";
import MonkeyInTheMiddle from "./solutions/day-11-monkey-in-the-middle-2";
import HillClimbingAlgorithm from "./solutions/day-12-hill-climbing-algorithm-2";

const solution: Solution = new HillClimbingAlgorithm()

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