import LinkedNode from "@src/Node/LinkedNode";
export default class Stack<T> {
  private cursor: LinkedNode<T> | null;
  private _size: number;
  constructor() {
    this.cursor = null;
    this._size = 0;
  }
  get size(): number {
    return this._size;
  }
  push(data: T): void {
    const newNode = new LinkedNode({ data });
    this._size++;
    if (this.size === 0) {
      this.cursor = newNode;
      return;
    }
    newNode.setPrev(this.cursor);
    this.cursor = newNode;
  }
  pop(): void {
    if (this.cursor === null) {
      throw Error("Error:: Empty Stack");
    }
    this._size--;
    this.cursor = <LinkedNode<T>>this.cursor.getPrev();
  }
  top(): T {
    if (this.cursor === null) {
      throw Error("Error:: Empty Stack");
    }
    return this.cursor.getData();
  }
  isEmpty(): boolean {
    return this.size === 0;
  }
}
