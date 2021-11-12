import DoubleLinkedList from "@src/DoubleLinkedList";
import LinkedNode from "@src/Node/LinkedNode";
import { compareFuncType, keyIndex } from "Global";
import BinaryNode from "./BinaryNode";

interface source<T, U> {
  compareFunc: compareFuncType<T>;
  isLeaf?: boolean;
  parent?: BNode<T, U> | null;
}
export default class BNode<T, U> {
  private _isLeaf: boolean;
  private _parent: BNode<T, U> | null;
  private compareFunc: compareFuncType<T>;
  private store: DoubleLinkedList<BinaryNode<keyIndex<T, U>>>;
  constructor(src: source<T, U>) {
    this.compareFunc = src.compareFunc;
    this.parent = src.parent === undefined ? null : src.parent;
    this.isLeaf = src.isLeaf === undefined ? false : src.isLeaf;
    this.store = new DoubleLinkedList<BinaryNode<keyIndex<T, U>>>();
  }
  insert(key: T, index: U): void {
    const data = new BinaryNode<keyIndex<T, U>>({
      data: new keyIndex(key, index),
    });
    if (this.store.size === 0) {
      this.store.pushBack(data);
      return;
    }
    let cursor: LinkedNode<BinaryNode<keyIndex<T, U>>> | null = <
      LinkedNode<BinaryNode<keyIndex<T, U>>>
    >this.store.front();
    while (
      cursor !== null &&
      this.compareFunc(cursor.getData().data.key, key)
    ) {
      cursor = cursor.getNextNode();
    }
    if (cursor === null) {
      this.store.pushBack(data);
    } else {
      this.store.pushPrev(cursor, data);
    }
  }
  get size(): number {
    return this.store.size;
  }
  public get parent(): BNode<T, U> | null {
    return this._parent;
  }
  public set parent(value: BNode<T, U> | null) {
    this._parent = value;
  }
  public get isLeaf(): boolean {
    return this._isLeaf;
  }
  public set isLeaf(value: boolean) {
    this._isLeaf = value;
  }
}
