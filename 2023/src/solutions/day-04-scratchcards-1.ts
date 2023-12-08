import { Solution } from "../utils"

export default class Scratchcards extends Solution {
  solve(input: string) {
    let result = 0

    const cards = this.get_lines(input)
      .map((line) => {
        return line.split(/(: | \| |Card )/)
      })
      .pipelog()
      .map((arr) => {
        return {
          card_numer: Number(arr[2]),
          winning: arr[4].trim().replace(/ +/g, " ").split(" ").map(Number),
          mine: arr[6].trim().replace(/ +/g, " ").split(" ").map(Number),
        }
      })
      .pipelog()

    for (let index = 0; index < cards.length; index++) {
      const card = cards[index]
      result += countCard(card)
    }

    return result
  }
}
function countCard(card: {
  card_numer: number
  winning: number[]
  mine: number[]
}) {
  let cum = 0
  for (let i = 0; i < card.mine.length; i++) {
    const c = card.mine[i]
    if (card.winning.includes(c)) {
      cum = cum == 0 ? 1 : cum * 2
    }
  }

  return cum
}
