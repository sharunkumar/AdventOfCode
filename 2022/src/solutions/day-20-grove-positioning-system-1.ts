import { sortBy } from "lodash"
import { Solution } from "../utils"
import { DLLNode, combine } from "../utils/LinkedList"

interface data {
  value: number
  moved: boolean
  start: boolean
}

export default class GrovePositioningSystem extends Solution {
  solve(input: string) {
    const nodes = this.get_lines(input).map(Number)
      .map((num) => new DLLNode<data>({
        moved: false,
        value: num,
        start: false
      }))

    nodes[0].data.start = true

    for (let i = 0; i < nodes.length; i++) {
      const node = nodes[i];
      combine(node, nodes[(i + 1) % nodes.length])
    }


    for (let i = 0; i < nodes.length; i++) {
      const running = nodes[i];
      move(running)
    }

    let new_nodes = [] as DLLNode<data>[]

    new_nodes.push(nodes.filter(x => x.data.value == 0)[0])

    let running = new_nodes[0]

    while (new_nodes.length !== nodes.length) {
      running = running.next
      new_nodes.push(running)
    }

    function value(n: number) {
      return new_nodes[n % new_nodes.length].data.value
    }

    return value(1000) + value(2000) + value(3000)

  }
}

function move(node: DLLNode<data>) {
  let count = node.data.value

  let current = node

  if (count > 0) {
    while (count) {
      let next = current.next
      let prev = current.previous

      if (next.data.start) {
        current.data.start = true
        next.data.start = false
      } else if (current.data.start) {
        current.data.start = false
        next.data.start = true
      }

      combine(current, next.next)
      combine(next, current)
      combine(prev, next)
      current.data.moved = true
      count--
    }
  } else if (count < 0) {
    while (count) {
      let next = current.next
      let prev = current.previous

      if (prev.data.start) {
        current.data.start = true
        prev.data.start = false
      } else if (current.data.start) {
        current.data.start = false
        prev.data.start = true
      }

      combine(prev.previous, current)
      combine(current, prev)
      combine(prev, next)

      current.data.moved = true
      count++
    }
  }
}