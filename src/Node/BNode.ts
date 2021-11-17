import DoubleLinkedList from "@src/DoubleLinkedList";
import LinkedNode from "@src/Node/LinkedNode";
import { compareFuncType } from "Global";
import keyIndex from "@src/Node/keyIndex";
import BLinkedNode from "./BLinkedNode";

interface source<T, U> {
  compareFunc: compareFuncType<T>;
  isLeaf?: boolean;
  parent?: BNode<T, U> | null;
}
export default class BNode<T, U> {
  private _isLeaf: boolean;
  private _parent: BNode<T, U> | null;
  private compareFunc: compareFuncType<T>;
  private store: DoubleLinkedList<BLinkedNode<T, U>>;
  constructor(src: source<T, U>) {
    this.compareFunc = src.compareFunc;
    this.parent = src.parent === undefined ? null : src.parent;
    this.isLeaf = src.isLeaf === undefined ? false : src.isLeaf;
    this.store = new DoubleLinkedList<BLinkedNode<T, U>>();
  }
  getFirstLinkedNode(): LinkedNode<BLinkedNode<T, U>> | null {
    try {
      return this.store.front();
    } catch (error) {
      return null;
    }
  }
  getLastLinkedNode(): LinkedNode<BLinkedNode<T, U>> | null {
    try {
      return this.store.back();
    } catch (error) {
      return null;
    }
  }
  insert(key: T, index: U): LinkedNode<BLinkedNode<T, U>> {
    const data = new BLinkedNode<T, U>({
      data: new keyIndex<T, U>(key, index),
    });
    if (this.store.size === 0) {
      this.store.pushBack(data);
      return this.store.back();
    }
    let cursor: LinkedNode<BLinkedNode<T, U>> | null = this.store.front();
    while (
      cursor !== null &&
      this.compareFunc(cursor.getData().data.key, key)
    ) {
      cursor = cursor.getNextNode();
    }
    if (cursor === null) {
      this.store.pushBack(data);
      return this.store.back();
    } else {
      this.store.pushPrev(cursor, data);
      return cursor.getPrevNode() as LinkedNode<BLinkedNode<T, U>>;
    }
  }
  remove(key: T): boolean {
    try {
      let cursor: LinkedNode<BLinkedNode<T, U>> | null = this.store.front();
      while (cursor !== null) {
        cursor = cursor.getNextNode() as LinkedNode<BLinkedNode<T, U>>;
        if (cursor.getData().data.key === key) {
          return this.store.erase(cursor);
        }
      }
    } catch (e) {
      if (e instanceof ReferenceError) {
        return false;
      }
    }
    return false;
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
