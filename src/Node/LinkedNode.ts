import { pointer } from "Global";
import Cusor from "./Cursor";

interface node<T> {
  prev?: Cusor<T>;
  next?: Cusor<T>;
  data: T;
}
export default class LinkedNode<T> extends Cusor<T> {
  private data: T;
  constructor(source: node<T>) {
    super();
    this.data = source.data;
    this.prev = source.prev == undefined ? null : source.prev;
    this.next = source.next == undefined ? null : source.next;
  }
  getNextNode(): LinkedNode<T> | null {
    const ret = this.getNext();
    if (ret === null) {
      throw Error("Error:: cursor is null");
    }
    if ("getData" in <LinkedNode<T>>ret) {
      return <LinkedNode<T>>ret;
    }
    return null;
  }
  getPrevNode(): LinkedNode<T> | null {
    const ret: pointer<Cusor<T>> = this.getPrev();
    if (ret === null) {
      throw Error("Error:: cursor is null");
    }
    if ("getData" in <LinkedNode<T>>ret) {
      return <LinkedNode<T>>ret;
    }
    return null;
  }
  getData(): T {
    return this.data;
  }
}
