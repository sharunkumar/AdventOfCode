import { get_lines, regexMatch, Solution } from "#/utils";

export default class BridgeRepair extends Solution {
  solve(input: string) {
    const equations = get_lines(input).map((line) => {
      return regexMatch(line, /(\d+)/g).map((x) => parseInt(x));
    });

    const result = equations
      .filter(is_valid_equation)
      .map((x) => x[0])
      .sum();

    return result;
  }
}

function is_valid_equation(equation: number[]) {
  const test_value = equation[0];
  const numbers = equation.slice(1);

  if (numbers.length < 2) return false;

  const operators = ["+", "*"];
  const combinations = [];

  // Generate all possible operator combinations
  for (let i = 0; i < Math.pow(2, numbers.length - 1); i++) {
    const ops = [];
    for (let j = 0; j < numbers.length - 1; j++) {
      ops.push(operators[(i >> j) & 1]);
    }
    combinations.push(ops);
  }

  // Test each combination
  for (const ops of combinations) {
    let result = numbers[0];
    for (let i = 0; i < ops.length; i++) {
      if (ops[i] === "+") {
        result += numbers[i + 1];
      } else {
        result *= numbers[i + 1];
      }
    }
    if (result === test_value) {
      return true;
    }
  }

  return false;
}
