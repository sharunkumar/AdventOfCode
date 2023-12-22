import { floor } from "lodash"
import { Solution } from "../utils"

export default class ParabolicReflectorDish extends Solution {
  solve(input: string) {
    let dish = this.get_matrix(input)

    function key() {
      return dish.map((row) => row.join("|")).join("-")
    }

    const checkpoints = [key()] as string[]

    let cycle = 1

    let CYCLES = 1000000000
    let curr = ""
    while (cycle <= CYCLES) {
      tilt_cycle(dish)
      curr = key()
      if (checkpoints.includes(curr)) {
        break
      } else {
        checkpoints.push(curr)
      }
      cycle++
    }

    const first = checkpoints.indexOf(curr)
    // console.log(cycle, first)

    // console.log(checkpoints)

    dish = checkpoints[((CYCLES - first) % (cycle - first)) + first]
      .split("-")
      .map((x) => x.split("|"))

    return dish
      .map((row, idx) =>
        row.map((c) => (c == "O" ? dish.length - idx : 0)).sum(),
      )
      .sum()
  }
}

function tilt_cycle(dish: string[][]) {
  // north
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
  // console.error("-")
  // dish.pipelog()

  // west
  for (let j = 1; j < dish.length; j++) {
    const col = dish.map((row) => row[j])
    col.forEach((rock, i) => {
      if (rock == "O") {
        let k = j - 1
        while (k >= 0) {
          if (dish[i][k] == ".") {
            dish[i][k] = "O"
            dish[i][k + 1] = "."
            k--
          } else {
            break
          }
        }
      }
    })
  }
  // console.error("-")
  // dish.pipelog()

  // south
  for (let i = dish.length - 2; i >= 0; i--) {
    const row = dish[i]
    row.forEach((rock, j) => {
      if (rock == "O") {
        let k = i + 1
        while (k < dish.length) {
          if (dish[k][j] == ".") {
            dish[k][j] = "O"
            dish[k - 1][j] = "."
            k++
          } else {
            break
          }
        }
      }
    })
  }
  // console.error("-")
  // dish.pipelog()

  // east
  for (let j = dish.length - 2; j >= 0; j--) {
    const col = dish.map((row) => row[j])
    col.forEach((rock, i) => {
      if (rock == "O") {
        let k = j + 1
        while (k >= 0) {
          if (dish[i][k] == ".") {
            dish[i][k] = "O"
            dish[i][k - 1] = "."
            k++
          } else {
            break
          }
        }
      }
    })
  }
  // console.error("-")
  // dish.pipelog()
}
