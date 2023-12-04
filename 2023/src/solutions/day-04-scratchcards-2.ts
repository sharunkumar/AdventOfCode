import { Solution } from "../utils"

export default class Scratchcards extends Solution {
  solve(input: string) {
    const cards = this.get_lines(input)
      .map((line) => {
        return line.split(/(: | \| |Card )/)
      })
      // .pipelog()
      .map((arr) => {
        return {
          card_numer: Number(arr[2]),
          winning: arr[4].trim().replace(/ +/g, " ").split(" ").map(Number),
          mine: arr[6].trim().replace(/ +/g, " ").split(" ").map(Number),
        }
      })
      .pipelog()

    let result = [] as typeof cards

    const cardMap = new Map<number, ArrayElement<typeof cards>>()
    const countMap = new Map<number, number>()

    cards.forEach((card) => {
      cardMap.set(card.card_numer, card)
      countMap.set(card.card_numer, countCard(card))
    })

    while (cards.length) {
      const c = cards.shift()

      if (!c) break

      let rez = countCard(c)

      if (rez == 0) {
        result.push(c)
      } else {
        result.push(c)
        for (let i = 1; i <= rez; i++) {
          const newCard = cardMap.get(c.card_numer + i)
          if (!newCard) continue
          cards.push(newCard)
        }
      }
    }

    return result.length
  }
}

type ArrayElement<ArrayType extends readonly unknown[]> = ArrayType extends readonly (infer ElementType)[] ? ElementType : never

function process(cards: { card_numer: number; winning: number[]; mine: number[] }[]) {
  return cards.map((card) => {
    const count = countCard(card)
    return count == 0 ? 1 : process(cards.slice(card.card_numer - 1, card.card_numer - 1 + count))
  })
}

function countCard(card: { card_numer: number; winning: number[]; mine: number[] }): number {
  return card.mine.filter((x) => card.winning.includes(x)).length
}
