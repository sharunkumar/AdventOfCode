export class DLLNode<T> {
    public next: DLLNode<T>
    public previous: DLLNode<T>
    constructor(public data: T) { }
}

export function combine<T>(current: DLLNode<T>, next: DLLNode<T>) {
    current.next = next
    next.previous = current
}
