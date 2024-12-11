import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { regexMatch } from "#/utils";
import path from "node:path";
import { titleCase } from "title-case";
import { $ } from "bun";

const [_1, _2, ...arg] = process.argv;

const arg_joined = arg.join(" ");

const title_with_day = arg_joined.replace(/Day (\d):/g, "Day 0$1:");

const title = titleCase(regexMatch(title_with_day, /: .*/g).join(""), {
  smallWords: new Set<string>(),
}).replace(": ", "");

const unsafe_regex = /[^a-zA-Z0-9-]/g;

const className = title
  .replace(/ /g, "")
  .replace(unsafe_regex, "")
  .replaceAll("-", "");

const file_name = title_with_day
  .replace(":", "")
  .replace(/ /g, "-")
  .replace(unsafe_regex, "")
  .toLowerCase();

const day_number = file_name.match(/\d+/g)?.join("");

const branch_name = `2024-${day_number}`;

const current_branch = (await $`git rev-parse --abbrev-ref HEAD`.text()).trim();

if (["main", "master"].includes(current_branch)) {
  await $`git checkout -b ${branch_name}`;
}

const file_path = path.join(".", "src", "solutions", file_name);

const test_file_path = path.join(".", "src", "tests", file_name);

const template_path = path.join(".", "src", "template", "TemplateSolution.ts");

const test_template_path = path.join(".", "src", "template", "TemplateTest.ts");

const sample_input_path = path.join(".", "io", `${className}.txt`);

const test_sample_input_path_1 = path.join(
  ".",
  "src",
  "tests",
  "io",
  `${file_name}.input.1.txt`
);
const test_sample_input_path_2 = path.join(
  ".",
  "src",
  "tests",
  "io",
  `${file_name}.input.2.txt`
);

const extensions = ["-1.ts", "-2.ts"];

const test_extensions = [".test.ts"];

const file_content = readFileSync(template_path)
  .toString()
  .replace(/TemplateSolution/g, className);

const test_file_content = readFileSync(test_template_path)
  .toString()
  .replace(/day 1/g, title_with_day)
  .replace(/day-01-calorie-counting/g, file_name);

for (const e of extensions) {
  createFile(file_path + e, file_content);
}

for (const e of test_extensions) {
  createFile(test_file_path + e, test_file_content);
}

createFile(sample_input_path);

createFile(test_sample_input_path_1);
createFile(test_sample_input_path_2);

await $`git add :/`;
await $`git commit -m ${"init: " + arg_joined}`;
await $`git push`;

function createFile(file_path: string, file_content = "") {
  if (!existsSync(file_path)) {
    writeFileSync(file_path, file_content, "utf-8");
    console.debug(`${file_path} created.`);
  }
}
