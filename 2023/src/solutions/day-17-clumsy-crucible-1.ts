import { Solution, numberc } from "../utils"

export default class ClumsyCrucible extends Solution {
  solve(input: string) {
    const map = this.get_matrix(input).map((row) =>
      row.map((char) => numberc(char)),
    )

    this.print_matrix(map)
  }
}
