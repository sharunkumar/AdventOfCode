import lcm from "compute-lcm"
import { Solution } from "../utils"

type modtype = "%" | "&"

class Module {
  public memory: string | Map<string, string>
  constructor(
    public name: string,
    public type: modtype,
    public outputs: string[],
  ) {
    if (type === "%") {
      this.memory = "off"
    } else if (type === "&") {
      this.memory = new Map<string, string>()
    } else {
      throw new Error(`invalid type ${type}`)
    }
  }
}

function conmem(module: Module) {
  if (module.type !== "&") throw new Error(`${module.name} is not a connector`)
  return module.memory as Map<string, string>
}

function flipmem(module: Module, value: string) {
  if (module.type !== "%") throw new Error(`${module.name} is not a flip-flip`)
  module.memory = value
}

export default class PulsePropagation extends Solution {
  solve(input: string) {
    const broadcast_targets = [] as string[]
    const modules = new Map<string, Module>()
    this.get_lines(input)
      .map((line) => {
        const split = line.split(" -> ")
        return [split[0], split[1].split(", ")].flat()
      })
      .forEach(([module, ...destinations]) => {
        if (module === "broadcaster") {
          broadcast_targets.push(...destinations)
        } else {
          const type = module[0]
          const name = module.slice(1)
          modules.set(name, new Module(name, type as modtype, destinations))
        }
      })

    modules.forEach((m) => {
      const { name, type, outputs } = m
      outputs.forEach((output) => {
        // console.log([name, output])
        if (modules.get(output)?.type == "&") {
          conmem(modules.get(output)!).set(name, "lo")
        }
      })
    })

    // console.log({ broadcast_targets, modules })

    const [feed, ..._] = Array.from(modules.entries())
      .filter(([name, module]) => module.outputs.includes("rx"))
      .map(([name, mod]) => name)

    if (_.length) {
      throw new Error(`Expected one feed, but there are many: ${_}`)
    }

    const cycle_lengths = new Map<string, number>()

    const seen = new Map(
      Array.from(modules.entries())
        .filter(([name, module]) => module.outputs.includes(feed))
        .map(([name, _]) => [name, 0]),
    )

    let presses = 0

    for (let i = 0; i < Infinity; i++) {
      presses += 1
      const q = broadcast_targets.map(
        (b) => ["broadcaster", b, "lo"] as [string, string, string],
      )

      while (q.length) {
        const [origin, target, pulse] = q.shift()!

        if (modules.has(target)) {
          const module = modules.get(target)!

          if (module.name === feed && pulse === "hi") {
            seen.set(origin, seen.get(origin)! + 1)
            if (!cycle_lengths.has(origin)) {
              cycle_lengths.set(origin, presses)
            }

            if (Array.from(seen.values()).every((x) => x)) {
              return lcm(Array.from(cycle_lengths.values()))
            }
          }

          if (module.type === "%") {
            if (pulse === "lo") {
              flipmem(module, module.memory === "on" ? "off" : "on")
              const outgoing = module.memory === "on" ? "hi" : "lo"
              module.outputs.map((out) => {
                q.push([module.name, out, outgoing])
              })
            }
          } else {
            const mem = conmem(module)
            mem.set(origin, pulse)

            const outgoing = Array.from(mem.values()).every((x) => x === "hi")
              ? "lo"
              : "hi"

            module.outputs.forEach((out) => {
              q.push([module.name, out, outgoing])
            })
          }
        }
      }
    }
  }
}
