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

function validate_equation(target: number, array: number[]): boolean {
  if (array.length === 1) return target === array[0];

  if (
    target % array[array.length - 1] === 0 &&
    validate_equation(
      Math.floor(target / array[array.length - 1]),
      array.slice(0, -1)
    )
  ) {
    return true;
  }

  if (
    target > array[array.length - 1] &&
    validate_equation(target - array[array.length - 1], array.slice(0, -1))
  ) {
    return true;
  }

  const targetStr = target.toString();
  const lastStr = array[array.length - 1].toString();
  if (
    targetStr.endsWith(lastStr) &&
    targetStr.length > lastStr.length &&
    validate_equation(
      parseInt(targetStr.slice(0, -lastStr.length)),
      array.slice(0, -1)
    )
  ) {
    return true;
  }

  return false;
}

function is_valid_equation(equation: number[]) {
  const test_value = equation[0];
  const numbers = equation.slice(1);

  if (numbers.length < 2) return false;

  return validate_equation(test_value, numbers);
}
