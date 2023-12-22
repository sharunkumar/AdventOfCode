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
          arr: inp.matrix
            .map((row) =>
              row.join("").replaceAll("#", "0").replaceAll(".", "1"),
            )
            .map((s) => parseInt(s, 2)),
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

function get_index(arr: number[]): number {
  for (let i = 1; i < arr.length - 1; i++) {
    if (equiv(arr.slice(0, i).reverse(), arr.slice(i))) return i
  }
  return NaN
}

function equiv(arr1: number[], arr2: number[]) {
  for (let i = 0; i < Math.min(arr1.length, arr2.length); i++) {
    if (arr1[i] !== arr2[i]) return false
  }
  return true
}
