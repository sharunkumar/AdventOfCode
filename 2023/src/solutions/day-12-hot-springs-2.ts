import { Solution, numberc } from "../utils"

export default class HotSprings extends Solution {
  solve(input: string) {
    return this.get_lines(input)
      .map((line) => line.split(" "))
      .map(
        ([first, second]) =>
          [first, second.split(",").map(numberc)] as [string, number[]],
      )
      .map(([cfg, nums]) =>
        count(new Array(5).fill(cfg).join("?"), new Array(5).fill(nums).flat()),
      )
      .sum()
  }
}

const cache = new Map<string, number>()

function count(cfg: string, nums: number[]): number {
  // console.log({ cfg, nums })
  if (cfg === "") {
    return nums.length == 0 ? 1 : 0
  }

  if (nums.length === 0) {
    return cfg.includes("#") ? 0 : 1
  }

  const key = [cfg, ...nums].join("$")

  if (cache.has(key)) {
    return cache.get(key)!
  }

  let result = 0

  const first = cfg[0]

  if (".?".includes(first)) {
    result += count(cfg.slice(1), nums)
  }

  if ("#?".includes(first)) {
    if (
      nums[0] <= cfg.length &&
      !cfg.slice(0, nums[0]).includes(".") &&
      (nums[0] == cfg.length || cfg[nums[0]] !== "#")
    ) {
      result += count(cfg.slice(nums[0] + 1), nums.slice(1))
    }
  }

  cache.set(key, result)

  return result
}
