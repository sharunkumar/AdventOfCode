import { Solution } from "../utils"

export default class ParabolicReflectorDish extends Solution {
  solve(input: string) {
    const dish = this.get_matrix(input)

    // dish.pipelog()
    tilt(dish)
    // console.error("-")
    // dish.pipelog()
    // this.print_matsrix(dish)
    return dish
      .map((row, idx) =>
        row.map((c) => (c == "O" ? dish.length - idx : 0)).sum(),
      )
      .sum()
  }
}

function tilt(dish: string[][]) {
  for (let i = 1; i < dish.length; i++) {
    const row = dish[i]
    row.forEach((rock, j) => {
      if (rock == "O") {
        let k = i - 1
        while (k >= 0) {
          if (dish[k][j] == ".") {
            dish[k][j] = "O"
            dish[k + 1][j] = "."
            k--
          } else {
            break
          }
        }
      }
    })
  }
}
