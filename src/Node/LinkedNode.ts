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
    if (source.prev !== undefined) {
      this.prev = source.prev;
    }
    if (source.next !== undefined) {
      this.next = source.next;
    }
    this.next = source.next ? source.next : null;
  }
  getData(): T {
    return this.data;
  }
}
