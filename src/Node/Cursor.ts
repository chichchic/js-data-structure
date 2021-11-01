type pointer<T> = cursor<T> | null;
export default class cursor<T> {
  protected prev: pointer<T>;
  protected next: pointer<T>;
  constructor() {
    this.prev = null;
    this.next = null;
  }
  getPrev() {
    return this.prev;
  }
  setPrev(newPrev: pointer<T>) {
    this.prev = newPrev;
  }
  getNext() {
    return this.next;
  }
  setNext(newNext: pointer<T>) {
    this.next = newNext;
  }
}
