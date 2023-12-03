import { existsSync, readFileSync, writeFileSync } from "fs";
import { Solution } from "./utils";
import path from "path";
import Trebuchet from "./solutions/day-01-trebuchet-2";

const solution: Solution = new Trebuchet();

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