import LinkedNode from "@src/Node/LinkedNode";
import DoubleLinkedList from "./DoubleLinkedList";
export default class Queue<T> {
  private innerClass: DoubleLinkedList<T>;
  constructor() {
    this.innerClass = new DoubleLinkedList<T>();
  }
  get size(): number {
    return this.innerClass.size;
  }
  isEmpty(): boolean {
    return this.innerClass.size === 0;
  }
  has(data: T): boolean {
    return this.innerClass.has(data);
  }
  push(data: T): void {
    this.innerClass.pushFront(data);
  }
  front(): LinkedNode<T> {
    return this.innerClass.front();
  }
  back(): LinkedNode<T> {
    return this.innerClass.back();
  }
  pop(): void {
    this.innerClass.popBack();
  }
}
