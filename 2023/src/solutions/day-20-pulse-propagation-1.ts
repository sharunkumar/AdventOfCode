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
          ;(modules.get(output)!.memory as Map<string, string>).set(name, "lo")
        }
      })
    })

    console.log({ broadcast_targets, modules })
  }
}
