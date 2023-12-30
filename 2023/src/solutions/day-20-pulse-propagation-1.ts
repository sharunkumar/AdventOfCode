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

    console.log({ broadcast_targets, modules })

    let lo = 0
    let hi = 0

    for (let i = 0; i < 1000; i++) {
      lo += 1
      const q = broadcast_targets.map(
        (b) => ["broadcaster", b, "lo"] as [string, string, string],
      )

      while (q.length) {
        const [origin, target, pulse] = q.shift()!
        if (pulse === "lo") lo += 1
        else hi += 1

        if (modules.has(target)) {
          const module = modules.get(target)!

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

    return lo * hi
  }
}
