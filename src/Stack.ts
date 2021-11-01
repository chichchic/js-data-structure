import LinkedNode from "@src/Node/LinkedNode";
export default class Stack<T> {
  private cursor: LinkedNode<T> | null;
  private size: number;
  constructor() {
    this.cursor = null;
    this.size = 0;
  }
  getSize() {
    return this.size;
  }
  push(data: T) {
    const newNode = new LinkedNode({ data });
    this.size++;
    if (this.size === 0) {
      this.cursor = newNode;
      return;
    }
    newNode.setPrev(this.cursor);
    this.cursor = newNode;
  }
  pop() {
    if (this.cursor === null) {
      throw Error("Error:: Empty Stack");
    }
    this.size--;
    this.cursor = this.cursor.getPrev();
  }
  top() {
    if (this.cursor === null) {
      throw Error("Error:: Empty Stack");
    }
    return this.cursor.getData();
  }
  isEmpty() {
    return this.size === 0;
  }
}
