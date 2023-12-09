import { Solution } from "../utils"

export default class MirageMaintenance extends Solution {
  solve(input: string) {
    return (
      this.get_lines(input)
        .map((line) => line.split(" ").map(Number))
        .map((nums) => {
          let stack = [nums]

          let running = nums

          do {
            let new_arr = [] as number[]
            for (let i = 0; i < running.length - 1; i++) {
              const e1 = running[i]
              const e2 = running[i + 1]
              new_arr.push(e2 - e1)
            }

            stack.push(new_arr)

            running = new_arr
          } while (running.filter((n) => n !== 0).length)

          return stack
        })
        // .map((stack) => stack.map((x) => x.reverse()))
        // .slice(-1)
        // .pipelog()
        .map((stack) => {
          let running = stack.at(-1)![0]

          for (let i = stack.length - 2; i >= 0; i--) {
            stack[i].unshift(stack[i][0] - running)
            running = stack[i][0]
          }
          // console.log("-")
          // stack.pipelog()
          return stack[0][0]
        })
        // .pipelog()
        .sum()
    )
  }
}
