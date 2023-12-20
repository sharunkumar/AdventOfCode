import { Solution } from "../utils"

export default class CosmicExpansion extends Solution {
  solve(input: string) {
    this.get_matrix(input).pipelog()
  }
}
