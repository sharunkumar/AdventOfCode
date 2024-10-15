import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { regexMatch } from "../utils";
import path from "node:path";

import("title-case").then(({ titleCase }) => {
	const [_1, _2, ...arg] = process.argv;

	const title_with_day = arg.join(" ").replace(/Day (\d):/g, "Day 0$1:");

	const title = titleCase(regexMatch(title_with_day, /: .*/g).join(""), {
		smallWords: new Set<string>(),
	}).replace(": ", "");

	const className = title.replace(/ /g, "");

	const file_name = title_with_day
		.replace(":", "")
		.replace(/ /g, "-")
		.toLowerCase();

	const file_path = path.join(".", "src", "solutions", file_name);

	const test_file_path = path.join(".", "src", "tests", file_name);

	const template_path = path.join(
		".",
		"src",
		"template",
		"TemplateSolution.ts",
	);

	const test_template_path = path.join(
		".",
		"src",
		"template",
		"TemplateTest.ts",
	);

	const sample_input_path = path.join(".", "io", `${className}.txt`);

	const test_sample_input_path_1 = path.join(
		".",
		"src",
		"tests",
		"io",
		`${file_name}.input.1.txt`,
	);
	const test_sample_input_path_2 = path.join(
		".",
		"src",
		"tests",
		"io",
		`${file_name}.input.2.txt`,
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
});

function createFile(file_path: string, file_content = "") {
	if (!existsSync(file_path)) {
		writeFileSync(file_path, file_content, "utf-8");
		console.debug(`${file_path} created.`);
	}
}
