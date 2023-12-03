export class LoopingIterator<T> {
  index: number
  count: number
  constructor(public array: T[]) {
    this.index = -1
    this.count = 0
  }

  next() {
    this.index = (this.index + 1) % this.array.length
    this.count++
    return this.array[this.index]
  }

  skip(count: number) {
    this.index = (this.index + count) % this.array.length
    this.count += count
  }
}
