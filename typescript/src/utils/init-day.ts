import { existsSync, readFileSync, writeFileSync } from "fs";
import { regexMatch } from ".";
import { titleCase } from "title-case";
import path from "path";

let [_1, _2, ...arg] = process.argv;

let title_with_day = arg.join(" ");

let title = titleCase(regexMatch(title_with_day, /: .*/g).join("")).replace(": ", "");

let className = title.replace(/ /g, "");

let file_name = title_with_day.replace(":", "").replace(/ /g, "-").toLowerCase();

let file_path = path.join(".", "src", "solutions", file_name);

let template_path = path.join(".", "src", "utils", "TemplateSolution.ts");

let sample_input_path = path.join(".", "io", className + ".txt");

let extensions = ["-1.ts", "-2.ts"];

let file_content = readFileSync(template_path)
  .toString()
  .replace(/TemplateSolution/g, className);

extensions.forEach((e) => createFile(file_path + e, file_content));

createFile(sample_input_path);

// console.log({ className, file_name, file_path })

function createFile(file_path: string, file_content: string = "") {
  if (!existsSync(file_path)) {
    writeFileSync(file_path, file_content, "utf-8");
    console.debug(`${file_path} created.`);
  }
}
