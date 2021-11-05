import { pointer } from "Global";
export default class Cursor<T> {
  protected prev: pointer<Cursor<T>>;
  protected next: pointer<Cursor<T>>;
  constructor() {
    this.prev = null;
    this.next = null;
  }
  getPrev(): pointer<Cursor<T>> {
    return this.prev;
  }
  setPrev(newPrev: pointer<Cursor<T>>): void {
    this.prev = newPrev;
  }
  getNext(): pointer<Cursor<T>> {
    return this.next;
  }
  setNext(newNext: pointer<Cursor<T>>): void {
    this.next = newNext;
  }
}
