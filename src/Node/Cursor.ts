type pointer<T> = cursor<T> | null;
export default class cursor<T> {
  protected prev: pointer<T>;
  protected next: pointer<T>;
  constructor() {
    this.prev = null;
    this.next = null;
  }
  getPrev(): pointer<T> {
    return this.prev;
  }
  setPrev(newPrev: pointer<T>): void {
    this.prev = newPrev;
  }
  getNext(): pointer<T> {
    return this.next;
  }
  setNext(newNext: pointer<T>): void {
    this.next = newNext;
  }
}
