import { existsSync, readFileSync, writeFileSync } from "fs";
import { Solution } from "./utils";
import path from "path";
import CalorieCounting from "./solutions/day-01-calorie-counting-2";
import RockPaperScissors from "./solutions/day-02-rock-paper-scissors-2";
import RucksackReorganization from "./solutions/day-03-rucksack-reorganization-2";
import CampCleanup from "./solutions/day-04-camp-cleanup-2";
import SupplyStacks from "./solutions/day-05-supply-stacks-2";
import TuningTrouble from "./solutions/day-06-tuning-trouble-2";
import NoSpaceLeftOnDevice from "./solutions/day-07-no-space-left-on-device-2";
import TreetopTreeHouse from "./solutions/day-08-treetop-tree-house-2";
import RopeBridge from "./solutions/day-09-rope-bridge-2";
import CathodeRayTube from "./solutions/day-10-cathode-ray-tube-2";
import MonkeyInTheMiddle from "./solutions/day-11-monkey-in-the-middle-2";
import HillClimbingAlgorithm from "./solutions/day-12-hill-climbing-algorithm-2";
import DistressSignal from "./solutions/day-13-distress-signal-2";
import RegolithReservoir from "./solutions/day-14-regolith-reservoir-2";
import BeaconExclusionZone from "./solutions/day-15-beacon-exclusion-zone-2";
import ProboscideaVolcanium from "./solutions/day-16-proboscidea-volcanium-2";
import PyroclasticFlow from "./solutions/day-17-pyroclastic-flow-2";
import BoilingBoulders from "./solutions/day-18-boiling-boulders-2";
import NotEnoughMinerals from "./solutions/day-19-not-enough-minerals-1";

const solution: Solution = new NotEnoughMinerals();

const input_file_name = path.join(__dirname, "..", "io", `${solution.constructor.name}.txt`);

if (!existsSync(input_file_name)) {
  writeFileSync(input_file_name, "", "utf-8");
  console.debug(`${input_file_name} created.`);
}

const input = readFileSync(input_file_name, "utf-8");

if (input == "") {
  console.debug(`add input to ${input_file_name} to continue.`);
  process.exit(0);
}

const start = Date.now();

const output = solution.solve(input);

output instanceof Promise ? output.then(ending) : ending(output);

function ending(output: any) {
  const end = Date.now();

  console.debug({ output });

  console.debug("solution runtime: " + (end - start) + "ms");
}

// writeFileSync(__dirname + "/io/output.txt", output.toString(), { encoding: "utf8" })
