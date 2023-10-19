import { Solution, inclusive_between as ibw, sleep, sum } from "../utils";

type Char = "#" | "." | "O" | "+";

export default class RegolithReservoir extends Solution {
  async solve(input: string) {
    let paths = this.get_lines(input).map((line) =>
      line.split(" -> ").map((rock) => rock.split(",").map(Number)),
    );
    // .pipelog()

    const rocks_x = paths
      .map((path) => path.map((rock) => rock[0]))
      .flat()
      .flat();
    const rocks_y = paths
      .map((path) => path.map((rock) => rock[1]))
      .flat()
      .flat();

    let min_x = rocks_x.reduce((acc, curr) => Math.min(acc, curr), 999);
    let max_x = rocks_x.reduce((acc, curr) => Math.max(acc, curr), 0);

    let min_y = rocks_y.reduce((acc, curr) => Math.min(acc, curr), 999);
    let max_y = rocks_y.reduce((acc, curr) => Math.max(acc, curr), 0);

    paths = paths.map((path) => path.map(([x, y]) => [x - min_x, y]));
    // .pipelog()

    let starting = [500 - min_x, 0];

    max_x = max_x - min_x;
    // max_y = max_y - min_y

    min_x = min_y = 0;

    // console.log({ min_x: 0, max_x: max_x - min_x, min_y: 0, max_y: max_y - min_y, starting })

    let box = construct_box(paths, max_x, max_y);

    // paths.map(rocks => rocks.map(([x,y]) => box[y][x] = "#"))

    for (let i = 0; i < paths.length; i++) {
      const path = paths[i];

      // console.log({path})

      let [x, y] = path[0];
      box[y][x] = "#";

      for (let j = 1; j < path.length; j++) {
        let [x1, y1] = path[j];

        // draw the endpoint
        box[y1][x1] = "#";

        // connect prev rock to endpoint
        if (x == x1) {
          for (let k = Math.min(y, y1); k <= Math.max(y, y1); k++) {
            box[k][x] = "#";
          }
        } else if (y == y1) {
          for (let k = Math.min(x, x1); k <= Math.max(x, x1); k++) {
            box[y][k] = "#";
          }
        }

        // update the current rock coordinates
        [x, y] = [x1, y1];
      }
    }

    box[starting[1]][starting[0]] = "+";

    let sands = 0;
    while (drop_sand(box, starting, max_x, max_y)) {
      sands++;
      // console.clear()
      // draw_box(box);
      // console.log({sands})
      // await sleep(10)
    }
    // drop_sand(box, starting, max_x, max_y)

    // await draw(paths, { min_x: 0, max_x: max_x - min_x, min_y: 0, max_y: max_y - min_y, starting })
    // draw_box(box)
    return { sands };
  }
}

function draw_box(box: Char[][]) {
  box.map((x) => x.join("")).pipelog();
}

function construct_box(paths: number[][][], max_x: number, max_y: number) {
  let box = [] as Char[][];
  for (let i = 0; i <= max_y; i++) {
    const row = [] as Char[];
    for (let j = 0; j <= max_x; j++) {
      row.push(".");
    }
    box.push(row);
  }

  return box;
}

function drop_sand(
  box: Char[][],
  starting: number[],
  max_x: number,
  max_y: number,
): boolean {
  let [x, y] = starting;

  do {
    let [x1, y1] = get_next_drop(box, x, y, max_x, max_y);

    function outOfBounts(): boolean {
      return !ibw(x1, 0, max_x) || !ibw(y1, 0, max_y);
    }

    if (outOfBounts()) return false;

    if (box[y1][x1] == ".") {
      [x, y] = [x1, y1];
    } else {
      break;
    }
  } while (true);

  box[y][x] = "O";

  return true;
}

function get_next_drop(
  box: Char[][],
  x: number,
  y: number,
  max_x: number,
  max_y: number,
): [number, number] {
  let [x1, y1] = [x, y];
  y1 += 1;

  function outOfBounts(): boolean {
    return !ibw(x1, 0, max_x) || !ibw(y1, 0, max_y);
  }

  if (outOfBounts() || box[y1][x1] == ".") return [x1, y1];

  if (box[y1][x1] == "#" || box[y1][x1] == "O") {
    x1 -= 1;
    if (outOfBounts() || box[y1][x1] == ".") return [x1, y1];
  }
  if (box[y1][x1] == "#" || box[y1][x1] == "O") {
    x1 += 2;
    if (outOfBounts() || box[y1][x1] == ".") return [x1, y1];
  }

  return [x1, y1];
}
// async function draw(paths: number[][][], data: { min_x: number; max_x: number; min_y: number; max_y: number; starting: number[]; }) {
//     for (let i = 0; i < paths.length; i++) {
//         const path = paths[i];

//     }
// }
// function draw(paths: number[][][], starting: number[]) {
//     throw new Error("Function not implemented.");
// }
