interface IItem<T> {
  prev: IItem<T> | null
  next: IItem<T> | null
  value: T
}
class Item<T> implements IItem<T> {
  prev: IItem<T> | null = null
  next: IItem<T> | null = null
  value: T
  constructor(value: any) {
    this.value = value
  }
}
export class Queue<T> {
  private head: IItem<T> | null = null
  private tail: IItem<T> | null = null
  private count: number = 0

  public push(value: T) {
    const item = new Item<T>(value)
    if (this.head === null) {
      this.head = item
    }
    if (this.tail !== null) {
      this.tail.next = item
      item.prev = this.tail
    }

    this.tail = item
    this.count += 1
  }

  public pop() {
    if (this.head === null) return null
    const item = this.head
    this.head = this.head.next

    if (this.head === null) {
      this.tail = null
    } else {
      this.head.prev = null
    }
    this.count -= 1
    return item.value
  }

  public isEmpty() {
    return this.head === null
  }

  public size() {
    return this.count
  }

  public toArray(): T[] {
    const array: T[] = []
    let currItem = this.head
    while (currItem !== null) {
      array.push(currItem.value)
      currItem = currItem.next
    }
    return array
  }

  public toReverseArray(): T[] {
    const array: T[] = []
    let currItem = this.tail
    while (currItem !== null) {
      array.push(currItem.value)
      currItem = currItem.prev
    }
    return array
  }

  private getItemFromHead(idx: number) {
    let i = 0
    let item: IItem<T> | null = this.head
    while (i < idx) {
      item = item?.next || null
      i += 1
    }
    return item
  }

  private getItemFromTail(idx: number) {
    let i = this.count - 1
    let item: IItem<T> | null = this.tail
    while (i > idx) {
      item = item?.prev || null
      i -= 1
    }
    return item
  }
  getItemBy(idx: number) {
    if (idx >= this.count) return null
    if (idx < 0) return null
    return idx < this.count - idx
      ? this.getItemFromHead(idx)
      : this.getItemFromTail(idx)
  }

  public delete(idx: number) {
    const item = this.getItemBy(idx)
    if (item === null) return false

    if (item.prev !== null) {
      item.prev.next = item.next
    }
    if (item.next !== null) {
      item.next.prev = item.prev
    }
    if (item === this.head) {
      this.head = item.next
    }
    if (item === this.tail) {
      this.tail = item.prev
    }
    this.count -= 1
    return true
  }
}

export class SizingQueue<T> extends Queue<T> {
  constructor(private maxSize: number = 10) {
    super()
  }

  push(value: T) {
    super.push(value)
    while (this.size() > this.maxSize) {
      this.pop()
    }
  }
}
