import { Solution } from "../utils"

const _inverse = {
  "-": "+",
  "+": "-",
  "*": "/",
  "/": "*",
}

type Node = {
  name: string
  num: number
  operation: string
  left: {
    name: string
    num?: number
    has_human?: boolean
  }
  right: {
    name: string
    num?: number
    has_human?: boolean
  }
  has_human: boolean
}

function solveImpl(input_parsed: string[][], node_name: string): Node {
  let curr_line =
    input_parsed[input_parsed.findIndex((line) => line[0] === node_name)]

  // Check if we have reached a leaf node. Leaf nodes have a length of 2
  // node name and a value. Non-leaf nodes have a length of 4:
  // node name, left node name, operation, right node name
  let leaf = curr_line.length === 2

  // creating the node object for the current node of the tree
  let node: Node = {
    name: node_name,
    num: leaf ? Number(curr_line[1]) : -Infinity,
    operation: leaf ? "" : curr_line[2],
    left: { name: leaf ? "" : curr_line[1] },
    right: { name: leaf ? "" : curr_line[3] },
    has_human: false,
  }

  // If the node has a number, we have reached a leaf node and can return it early
  if (node.num > -Infinity) {
    // Gotta check if we have reached humn so we can track the path back to it later
    if (node.name === "humn") node.has_human = true
    return node
  }

  // Recursive call to get the left and right nodes of the current node
  node.left = solveImpl(input_parsed, node.left.name)
  node.right = solveImpl(input_parsed, node.right.name)

  // use eval() to evaluate the operation and assign the resulting value to the current node
  node.num = Number(
    eval(`${node.left.num} ${node.operation} ${node.right.num}`),
  )

  // Keep track of whether the current branch has humn in it
  if (node.left.has_human || node.right.has_human) {
    node.has_human = true
  }

  // We can return early if we're still building the tree
  if (node.name !== "root") return node

  // If we're back to the root node, we can call track_human_path() to get the answer for part 2
  // Or just return the value for Part 1. Since we can reuse the output from Part 1 for Part 2,
  // we can just save the value for Part 1 in a return object, continue on solving for Part 2,
  // and then return the object with both answers at the end

  // Solve for part 2 with the tree object we have built
  let nr_to_match = node.left.has_human ? node.right.num : node.left.num
  let humn_branch = node.left.has_human ? node.left : node.right

  // Save the result of track_human_path() in the return object and return it
  return track_human_path(humn_branch, nr_to_match!) as unknown as Node
}
function track_human_path(
  node: {
    name: any
    num?: number | undefined
    has_human?: boolean | undefined
    left?: any
    right?: any
    operation?: any
  },
  tracked_number: number,
) {
  // If we have reached the humn node, return the answer.
  if (node.name === "humn") return tracked_number

  // Check which node in the tree we need to evaluate next.
  let humn_side = node.left.has_human ? node.left : node.right

  // Check which side of the node we need to evaluate next.
  let side = node.left.has_human ? "left" : "right"

  if (side === "left") {
    // If the tracked_number is substituted for the left number, we can just invert
    // the operation and evaluate it against the right number in the same order as
    // the original operation.
    node.operation = _inverse[node.operation]
    node.left.num = tracked_number
    tracked_number = eval(
      `${node.left.num} ${node.operation} ${node.right.num}`,
    )
  } else {
    node.right.num = tracked_number

    // If the tracked_number is substituted for the right number, we have to invert
    // the whole operand, along with the operation, unless the operation is a
    // subtraction, in which case we can just substitute the tracked_number for
    // the right number and evaluate the operand in the same order as the original
    if (node.operation !== "-") {
      node.operation = _inverse[node.operation]
      tracked_number = eval(
        `${node.right.num} ${node.operation} ${node.left.num}`,
      )
    } else {
      tracked_number = eval(
        `${node.left.num} ${node.operation} ${node.right.num}`,
      )
    }
  }

  // Recursively call the function with the next node and the new tracked number.
  return track_human_path(humn_side, tracked_number)
}

export default class MonkeyMath extends Solution {
  parse_input(input: string) {
    const input_lines = this.get_lines(input)
    let output: string[][] = []
    for (let i = 0; i < input_lines.length; i++) {
      let line = input_lines[i].trim().split(": ")
      let name = line[0]
      let operation = line[1].split(" ")
      output.push([name, ...operation])
    }
    return output
  }
  solve(input: string) {
    return solveImpl(this.parse_input(input).slice(), "root")
  }
}
