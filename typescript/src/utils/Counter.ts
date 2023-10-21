export default class Counter<T> {
  private counts: Map<T, number> = new Map<T, number>();

  constructor(items?: T[]) {
    if (items) {
      this.update(items);
    }
  }

  update(items: T[]): void {
    for (const item of items) {
      this.increment(item);
    }
  }

  increment(item: T): void {
    const count = this.counts.get(item) || 0;
    this.counts.set(item, count + 1);
  }

  decrement(item: T): void {
    const count = this.counts.get(item) || 0;
    if (count <= 1) {
      this.counts.delete(item);
    } else {
      this.counts.set(item, count - 1);
    }
  }

  getCount(item: T): number {
    return this.counts.get(item) || 0;
  }

  getItems(): T[] {
    return Array.from(this.counts.keys());
  }

  getCounts(): number[] {
    return Array.from(this.counts.values());
  }

  getEntries(): [T, number][] {
    return Array.from(this.counts.entries());
  }
}
