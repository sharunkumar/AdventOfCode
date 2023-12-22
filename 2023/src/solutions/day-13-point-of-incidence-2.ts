import { Solution } from "../utils"

interface input {
  factor: number
  matrix: string[][]
}

export default class PointOfIncidence extends Solution {
  solve(input: string) {
    return this.get_blocks(input)
      .map((block) => this.get_matrix(block))
      .map((m): input[] => [
        {
          factor: 100,
          matrix: m,
        },
        {
          factor: 1,
          matrix: transpose(m),
        },
      ])
      .flat()
      .map((inp) => {
        return {
          f: inp.factor,
          arr: inp.matrix.map((row) => row.join("")),
        }
      })
      .map((x) => {
        return x.f * get_index(x.arr)
      })
      .filter((x) => !isNaN(x))
      .sum()
  }
}

function transpose(matrix: string[][]): string[][] {
  return matrix[0].map((_, i) => matrix.map((row) => row[i]))
}

function get_index(arr: string[]): number {
  for (let i = 1; i < arr.length; i++) {
    if (diff(arr.slice(0, i).reverse(), arr.slice(i)) == 1) return i
  }
  return NaN
}

function diff(arr1: string[], arr2: string[]): number {
  if (arr1.length == 0 || arr2.length == 0) return 0

  return arr1
    .map((str, idx) => [str, arr2[idx]])
    .filter(([first, second]) => second)
    .map(([first, second]) =>
      first
        .split("")
        .map((c, idx) => (second[idx] == c ? 0 : 1))
        .sum(),
    )
    .sum()
}
