import { Solution, regexMatch } from "../utils";

// based on leddoo's "Going Fast Is About Doing Less"
// https://www.youtube.com/watch?v=5rb0vvJ7NCY
// https://github.com/leddoo/vids/tree/main/do-less

class Blueprint {
  public max_ore_cost: number;
  constructor(
    public id: number,
    public ore_robot: number,
    public clay_robot: number,
    public obsidian_robot: [number, number],
    public geode_robot: [number, number],
  ) {
    this.max_ore_cost = Math.max(ore_robot, clay_robot, obsidian_robot[0], geode_robot[0]);
  }

  max_clay_cost() {
    return this.obsidian_robot[1];
  }
  max_obsidian_cost() {
    return this.geode_robot[1];
  }
}

class Pack {
  public ore_robot = 1;
  public clay_robot = 0;
  public obsidian_robot = 0;
  public geode_robot = 0;
  public ore = 0;
  public clay = 0;
  public obsidian = 0;
  public geode = 0;
}

class MaxResult {
  result = 0;
}

class State {
  public minute = 0;
  public pack = new Pack();
}

function step(state: State): State {
  let new_state: State = { minute: state.minute, pack: { ...state.pack } };
  new_state.minute += 1;
  new_state.pack.ore += new_state.pack.ore_robot;
  new_state.pack.clay += new_state.pack.clay_robot;
  new_state.pack.obsidian += new_state.pack.obsidian_robot;
  new_state.pack.geode += new_state.pack.geode_robot;
  return new_state;
}

function can_build_ore_robot(state: State, bp: Blueprint): boolean {
  return state.pack.ore >= bp.ore_robot;
}

function can_build_clay_robot(state: State, bp: Blueprint): boolean {
  return state.pack.ore >= bp.clay_robot;
}

function can_build_obsidian_robot(state: State, bp: Blueprint): boolean {
  return state.pack.ore >= bp.obsidian_robot[0] && state.pack.clay >= bp.obsidian_robot[1];
}

function can_build_geode_robot(state: State, bp: Blueprint): boolean {
  return state.pack.ore >= bp.geode_robot[0] && state.pack.obsidian >= bp.geode_robot[1];
}

function build_ore_robot(state: State, bp: Blueprint): State {
  state.pack.ore -= bp.ore_robot;
  state.pack.ore_robot += 1;
  return state;
}

function build_clay_robot(state: State, bp: Blueprint): State {
  state.pack.ore -= bp.clay_robot;
  state.pack.clay_robot += 1;
  return state;
}

function build_obsidian_robot(state: State, bp: Blueprint): State {
  state.pack.ore -= bp.obsidian_robot[0];
  state.pack.clay -= bp.obsidian_robot[1];
  state.pack.obsidian_robot += 1;
  return state;
}

function build_geode_robot(state: State, bp: Blueprint): State {
  state.pack.ore -= bp.geode_robot[0];
  state.pack.obsidian -= bp.geode_robot[1];
  state.pack.geode_robot += 1;
  return state;
}

export default class NotEnoughMinerals extends Solution {
  solution(state: State, bp: Blueprint, limit: number, rez: MaxResult, can_ore: boolean, can_clay: boolean, can_obsidian: boolean, stack_level: number) {
    // console.log({ stack_level });
    // console.log({ stack_level, state, limit });
    if (state.minute == limit) {
      // console.log("Hit!", { state });
      rez.result = Math.max(state.pack.geode, rez.result);
      return;
    }

    let remaining = limit - state.minute;
    let max_yeild = remaining * state.pack.geode_robot + Math.floor((remaining * (remaining - 1)) / 2);

    if (state.pack.geode + max_yeild <= rez.result) {
      return;
    }

    if (can_build_geode_robot(state, bp)) {
      this.solution(build_geode_robot(step(state), bp), bp, limit, rez, true, true, true, stack_level + 1);
    } else {
      let new_can_obsidian = true;
      if (can_build_obsidian_robot(state, bp)) {
        new_can_obsidian = false;

        // can only build one bot per turn.
        // don't need more bots, if we're producing enough,
        // so we can build the most expensive bot on each turn.
        if (can_obsidian && state.pack.obsidian_robot < bp.max_obsidian_cost()) {
          this.solution(build_obsidian_robot(step(state), bp), bp, limit, rez, true, true, true, stack_level + 1);
        }
      }

      let new_can_clay = true;
      if (can_build_clay_robot(state, bp)) {
        new_can_clay = false;

        if (can_clay && state.pack.clay_robot < bp.max_clay_cost()) {
          this.solution(build_clay_robot(step(state), bp), bp, limit, rez, true, true, true, stack_level + 1);
        }
      }

      let new_can_ore = true;
      if (can_build_ore_robot(state, bp)) {
        new_can_ore = false;

        if (can_ore && state.pack.ore_robot < bp.max_ore_cost) {
          this.solution(build_ore_robot(step(state), bp), bp, limit, rez, true, true, true, stack_level + 1);
        }
      }

      this.solution(step(state), bp, limit, rez, new_can_ore, new_can_clay, new_can_obsidian, stack_level + 1);
    }
  }

  solve(input: string) {
    let blueprints = this.get_lines(input)
      .map((line) => regexMatch(line, /\d+/g).map(Number) as [number, number, number, number, number, number, number])
      .map((input) => new Blueprint(input[0], input[1], input[2], [input[3], input[4]], [input[5], input[6]]));
    // .pipelog();

    let result = 1;

    let geodes = [] as number[];

    for (let i = 0; i < Math.min(3, blueprints.length); i++) {
      let rez = new MaxResult();
      // console.log({ bp: blueprints[i] });
      this.solution(new State(), blueprints[i], 32, rez, true, true, true, 0);
      // console.log({ geodes: rez.result });
      geodes.push(rez.result);
      result *= rez.result;
    }

    return { result, geodes };
  }
}
