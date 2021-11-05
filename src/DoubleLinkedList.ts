import LinkedNode from "@src/Node/LinkedNode";
import Cursor from "@src/Node/Cursor";
//FIXME: queue에서 상속 받는 구조로 변경하기.
//TODO: @@iterator를 통해서 for문 사용할 수 있도록 만들기.
export default class DoubleLinkedList<T> {
  private head: Cursor<T>;
  private tail: Cursor<T>;
  private _size: number;
  constructor() {
    this.head = new Cursor();
    this.tail = new Cursor();
    this.head.setNext(this.tail);
    this.tail.setPrev(this.head);
    this._size = 0;
  }
  get size(): number {
    return this._size;
  }
  isEmpty(): boolean {
    return this.size === 0;
  }
  has(data: T): boolean {
    //FIXME: pop과 중복되는 구조 따로 함수로 빼기
    let cursor = this.head.getNext();
    while (cursor !== this.tail) {
      if ((<LinkedNode<T>>cursor).getData() === data) {
        return true;
      }
      if (cursor === null) {
        throw Error("Error:: cursor is null");
      }
      cursor = cursor.getNext();
    }
    return false;
  }
  pushNext(target: Cursor<T>, data: T): void {
    const newNode = new LinkedNode({ data });
    newNode.setPrev(target);
    newNode.setNext(target.getNext());
    target.getNext()?.setPrev(newNode);
    target.setNext(newNode);
    this._size++;
  }
  pushPrev(target: Cursor<T>, data: T): void {
    const newNode = new LinkedNode({ data });
    newNode.setPrev(target.getPrev());
    newNode.setNext(target);
    target.getPrev()?.setNext(newNode);
    target.setPrev(newNode);
    this._size++;
  }
  pushFront(data: T): void {
    this.pushNext(this.head, data);
  }
  pushBack(data: T): void {
    this.pushPrev(this.tail, data);
  }
  front(): LinkedNode<T> {
    if (this.head.getNext() === this.tail) {
      throw new ReferenceError("Error:: DoubleLinkedList is Empty");
    }
    return <LinkedNode<T>>this.head.getNext();
  }
  back(): LinkedNode<T> {
    if (this.tail.getPrev() === this.head) {
      throw new ReferenceError("Error:: DoubleLinkedList is Empty");
    }
    return <LinkedNode<T>>this.tail.getPrev();
  }
  erase(target: LinkedNode<T>): boolean {
    let cursor = this.head.getNext();
    while (cursor !== this.tail) {
      if (<LinkedNode<T>>cursor === target) {
        break;
      }
      if (cursor === null) {
        throw Error("Error:: cursor is null");
      }
      cursor = cursor.getNext();
    }
    if (cursor === this.tail) {
      return false;
    }
    if (cursor === null) {
      throw Error("Error:: cursor is null");
    }
    const cursorPrev = cursor.getPrev();
    const cursorNext = cursor.getNext();
    if (cursorPrev === null || cursorNext === null) {
      throw Error("Error:: cursor is null");
    }
    cursorPrev.setNext(cursorNext);
    cursorNext.setPrev(cursorPrev);
    this._size--;
    return true;
  }
  //FIXME: erase와 중복 부분 없애기.
  popBack(): boolean {
    const target = this.tail.getPrev();
    if (target === this.head || target === null) {
      return false;
    }
    const targetPrev = target.getPrev();
    const targetNext = target.getNext();
    if (targetPrev === null || targetNext === null) {
      throw Error("Error:: cursor is null");
    }
    targetPrev.setNext(targetNext);
    targetNext.setPrev(targetPrev);
    this._size--;
    return true;
  }
  popFront(): boolean {
    const target = this.head.getNext();
    if (target === this.tail || target === null) {
      return false;
    }
    const targetPrev = target.getPrev();
    const targetNext = target.getNext();
    if (targetPrev === null || targetNext === null) {
      throw Error("Error:: cursor is null");
    }
    targetPrev.setNext(targetNext);
    targetNext.setPrev(targetPrev);
    this._size--;
    return true;
  }
}
