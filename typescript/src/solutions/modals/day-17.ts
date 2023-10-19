export interface height_rock {
  height: number;
  rock: number;
}

export class Rock {
  height: number;
  width: number;

  private vec_bottom = [] as number[];
  private vec_right = [] as number[];
  private vec_left = [] as number[];

  constructor(public rows: string[]) {
    this.height = this.rows.length;
    this.width = this.rows[0].length;
  }

  surface_vector_bottom() {
    if (this.vec_bottom.length > 0) {
      // cache it
      return this.vec_bottom;
    }

    let surface = [] as number[];

    for (let i = 0; i < this.width; i++) {
      surface.push(0);
    }

    let r = this.height - 1;

    let inc = 1;

    while (surface.includes(0) && r >= 0) {
      let spread = this.rows[r].split("").map((c) => (c == "#" ? inc : 0));
      spread.forEach(
        (x, idx) =>
          (surface[idx] = x == inc && surface[idx] == 0 ? x : surface[idx]),
      );

      inc++;
      r--;
    }

    this.vec_bottom = surface.map((s) => -s + 1);
    return this.vec_bottom;
  }

  private cols(c: number) {
    let cols = [] as string[];
    for (let i = 0; i < this.rows.length; i++) {
      const row = this.rows[i];
      cols.push(row.charAt(c));
    }

    return cols;
  }

  surface_vector_right() {
    if (this.vec_right.length > 0) {
      // cache it
      return this.vec_right;
    }

    let surface = [] as number[];

    for (let i = 0; i < this.height; i++) {
      surface.push(0);
    }

    let c = this.width - 1;

    let inc = 1;

    while (surface.includes(0) && c >= 0) {
      let spread = this.cols(c).map((c) => (c == "#" ? inc : 0));
      spread.forEach(
        (x, idx) =>
          (surface[idx] = x == inc && surface[idx] == 0 ? x : surface[idx]),
      );

      inc++;
      c--;
    }

    this.vec_right = surface.map((s) => -s + 1);
    return this.vec_right;
  }

  surface_vector_left() {
    if (this.vec_left.length > 0) {
      // cache it
      return this.vec_left;
    }

    let surface = [] as number[];

    for (let i = 0; i < this.height; i++) {
      surface.push(0);
    }

    let c = 0;

    let inc = 1;

    while (surface.includes(0) && c < this.width) {
      let spread = this.cols(c).map((c) => (c == "#" ? inc : 0));
      spread.forEach(
        (x, idx) =>
          (surface[idx] = x == inc && surface[idx] == 0 ? x : surface[idx]),
      );

      inc++;
      c++;
    }

    this.vec_left = surface.map((s) => s - 1);
    return this.vec_left;
  }
}
