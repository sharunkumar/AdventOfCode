import { Solution } from "../utils"

export default class CubeConundrum extends Solution {
  solve(input: string) {
    return this.get_lines(input)
      .map((line) => {
        const [game, ...rest] = line.split(": ")

        const groups = rest[rest.length - 1].split("; ")

        let game_number = Number(game.split(" ")[1])

        return { game_number, groups }
      })
      .map(({ game_number, groups }) => {
        const sets = groups
          .map((g) =>
            g.split(", ").map((ball) => {
              const ball_data = ball.split(" ")
              return {
                ball: ball_data[1],
                count: Number(ball_data[0]),
              }
            }),
          )
          .flat()
        return { game_number, sets }
      })
      .map(({ game_number, sets }) => {
        const fewest = {
          red: 0,
          green: 0,
          blue: 0,
        }

        for (let idx = 0; idx < sets.length; idx++) {
          const set = sets[idx]
          if (fewest[set.ball] < set.count) {
            fewest[set.ball] = set.count
          }
        }

        return { game_number, fewest }
      })
      .map(({ fewest }) => fewest.red * fewest.green * fewest.blue)
      .sum()
  }
}
