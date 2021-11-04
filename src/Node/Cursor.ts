import { pointer } from "Global";
export default class Cursor<T> {
  protected prev: pointer<T, Cursor<T>>;
  protected next: pointer<T, Cursor<T>>;
  constructor() {
    this.prev = null;
    this.next = null;
  }
  getPrev(): pointer<T, Cursor<T>> {
    return this.prev;
  }
  setPrev(newPrev: pointer<T, Cursor<T>>): void {
    this.prev = newPrev;
  }
  getNext(): pointer<T, Cursor<T>> {
    return this.next;
  }
  setNext(newNext: pointer<T, Cursor<T>>): void {
    this.next = newNext;
  }
}
