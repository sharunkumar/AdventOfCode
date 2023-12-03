import { existsSync, readFileSync, writeFileSync } from "fs"
import { regexMatch } from "."
import path from "path"

import("title-case").then(({ titleCase }) => {
  let [_1, _2, ...arg] = process.argv

  let title_with_day = arg.join(" ").replace(/Day (\d):/g, "Day 0$1:")

  let title = titleCase(regexMatch(title_with_day, /: .*/g).join(""), {
    smallWords: new Set<string>(),
  }).replace(": ", "")

  let className = title.replace(/ /g, "")

  let file_name = title_with_day.replace(":", "").replace(/ /g, "-").toLowerCase()

  let file_path = path.join(".", "src", "solutions", file_name)

  let test_file_path = path.join(".", "src", "tests", file_name)

  let template_path = path.join(".", "src", "utils", "TemplateSolution.ts")

  let test_template_path = path.join(".", "src", "utils", "TemplateTest.ts")

  let sample_input_path = path.join(".", "io", className + ".txt")

  let test_sample_input_path_1 = path.join(".", "src", "tests", "io", file_name + ".input.1.txt")
  let test_sample_input_path_2 = path.join(".", "src", "tests", "io", file_name + ".input.2.txt")

  let extensions = ["-1.ts", "-2.ts"]

  let test_extensions = [".test.ts"]

  let file_content = readFileSync(template_path)
    .toString()
    .replace(/TemplateSolution/g, className)

  let test_file_content = readFileSync(test_template_path)
    .toString()
    .replace(/day 1/g, title_with_day)
    .replace(/day-01-calorie-counting/g, file_name)

  extensions.forEach((e) => createFile(file_path + e, file_content))

  test_extensions.forEach((e) => createFile(test_file_path + e, test_file_content))

  createFile(sample_input_path)

  createFile(test_sample_input_path_1)
  createFile(test_sample_input_path_2)
})

function createFile(file_path: string, file_content: string = "") {
  if (!existsSync(file_path)) {
    writeFileSync(file_path, file_content, "utf-8")
    console.debug(`${file_path} created.`)
  }
}
