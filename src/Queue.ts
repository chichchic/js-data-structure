import LinkedNode from "@src/Node/LinkedNode";
import Cursor from "@src/Node/Cursor";
export default class Queue<T> {
  private head: Cursor<T>;
  private tail: Cursor<T>;
  private size: number;
  constructor() {
    this.head = new Cursor();
    this.tail = new Cursor();
    this.head.setNext(this.tail);
    this.tail.setPrev(this.head);
    this.size = 0;
  }
  getSize(): number {
    return this.size;
  }
  isEmpty(): boolean {
    return this.size === 0;
  }
  has(data: T): boolean {
    let cursor = this.head.getNext();
    while (cursor !== this.tail) {
      if ((<LinkedNode<T>>cursor).getData() === data) {
        return true;
      }
      if (cursor === null) {
        throw Error("Error:: cursor is null");
      }
      cursor = cursor.getNext();
    }
    return false;
  }
  push(data: T): void {
    const newNode = new LinkedNode({ data });
    (<LinkedNode<T>>this.head.getNext()).setPrev(newNode);
    newNode.setNext(this.head.getNext());
    this.head.setNext(newNode);
    newNode.setPrev(this.head);
    this.size++;
  }
  front(): LinkedNode<T> {
    if (this.head.getNext() === this.tail) {
      throw new ReferenceError("Error:: DoubleLinkedList is Empty");
    }
    return <LinkedNode<T>>this.head.getNext();
  }
  back(): LinkedNode<T> {
    if (this.tail.getPrev() === this.head) {
      throw new ReferenceError("Error:: DoubleLinkedList is Empty");
    }
    return <LinkedNode<T>>this.tail.getPrev();
  }
  pop(): boolean {
    const target = this.tail.getPrev();
    if (target === this.head || target === null) {
      return false;
    }
    const targetPrev = target.getPrev();
    const targetNext = target.getNext();
    if (targetPrev === null || targetNext === null) {
      throw Error("Error:: cursor is null");
    }
    targetPrev.setNext(targetNext);
    targetNext.setPrev(targetPrev);
    this.size--;
    return true;
  }
}
