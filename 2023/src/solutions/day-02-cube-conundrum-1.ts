import { Solution } from "../utils"

const limits = {
  red: 12,
  green: 13,
  blue: 14,
}

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
                count: ball_data[0],
              }
            }),
          )
          .map((data) => {
            return data.map((d) => {
              return limits[d.ball] >= d.count
            })
          })
          .flat()
        return { game_number, sets }
      })
      .filter((games) => {
        return !games.sets.includes(false)
      })
      .map((g) => g.game_number)
      .sum()
  }
}
