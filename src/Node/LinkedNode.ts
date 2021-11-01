type nodeLinking<T> = LinkedNode<T> | null;

interface node<T> {
  prev?: nodeLinking<T>;
  next?: nodeLinking<T>;
  data: T;
}
export default class LinkedNode<T> {
  private prev: nodeLinking<T>;
  private next: nodeLinking<T>;
  private data: T;
  constructor(source: node<T>) {
    this.data = source.data;
    this.prev = source.prev ? source.prev : null;
    this.next = source.next ? source.next : null;
  }

  getPrev() {
    return this.prev;
  }
  setPrev(newPrev: nodeLinking<T>) {
    this.prev = newPrev;
  }
  getNext() {
    return this.next;
  }
  setNext(newNext: nodeLinking<T>) {
    this.next = newNext;
  }
  getData() {
    return this.data;
  }
}
