import BNode from "@src/Node/BNode";
import LinkedNode from "@src/Node/LinkedNode";
import BLinkedNode from "@src/Node/BLinkedNode";
import { compareFuncType } from "Global";

export default class BTree<T, U> {
  compareFunc: compareFuncType<T>;
  private _size: number;
  private root: BNode<T, U> | null;
  private max: number;
  private min: number;
  constructor(compareFunc: compareFuncType<T>, max = 3) {
    this.compareFunc = compareFunc;
    this._size = 0;
    this.root = null;
    this.max = max;
    this.min = Math.ceil(max / 2) - 1;
  }
  isEmpty(): boolean {
    return this.size === 0;
  }
  getIndex(key: T): U | null {
    let cursor = this.root;
    while (cursor != null) {
      let innerCursor = cursor.getFirstLinkedNode();
      while (innerCursor != null) {
        const innerCurKey = (
          innerCursor as LinkedNode<BLinkedNode<T, U>>
        ).getData().data.key;
        if (innerCurKey === key) {
          return (innerCursor as LinkedNode<BLinkedNode<T, U>>).getData().data
            .index;
        }
        if (this.compareFunc(key, innerCurKey)) {
          break;
        }
        innerCursor = innerCursor.getNextNode();
      }
      if (cursor.isLeaf) {
        break;
      }
      if (innerCursor === null) {
        cursor = (
          cursor.getLastLinkedNode() as LinkedNode<BLinkedNode<T, U>>
        ).getData().next;
      } else {
        cursor = (innerCursor as LinkedNode<BLinkedNode<T, U>>).getData().prev;
      }
    }
    return null;
  }
  insert(key: T, index: U): void {
    this._size++;
    if (this.root === null) {
      this.root = new BNode<T, U>({
        isLeaf: true,
        compareFunc: this.compareFunc,
      });
      this.root.insert(key, index);
      return;
    }
    let cursor: BNode<T, U> | null = this.root;
    while (cursor !== null) {
      if (cursor.size === this.max) {
        cursor = this.split(cursor);
      }
      if (cursor.isLeaf) {
        cursor.insert(key, index);
        break;
      }
      let linkCursor: LinkedNode<BLinkedNode<T, U>> | null =
        cursor.getFirstLinkedNode();
      while (
        linkCursor !== null &&
        this.compareFunc(linkCursor.getData().data.key, key)
      ) {
        linkCursor = linkCursor.getNextNode();
      }
      if (linkCursor === null) {
        cursor = (
          cursor.getLastLinkedNode() as LinkedNode<BLinkedNode<T, U>>
        ).getData().next;
      } else {
        cursor = linkCursor.getData().prev;
      }
    }
  }
  private split(node: BNode<T, U>) {
    const parent: BNode<T, U> =
      node === this.root
        ? new BNode<T, U>({ compareFunc: this.compareFunc })
        : (node.parent as BNode<T, U>);
    if (node === this.root) {
      this.root = parent;
    }
    const prev = new BNode<T, U>({
      compareFunc: this.compareFunc,
      isLeaf: node.isLeaf,
      parent,
    });
    this.moveEntry(prev, node, 0, this.min - 2);
    const next = new BNode<T, U>({
      compareFunc: this.compareFunc,
      isLeaf: node.isLeaf,
      parent,
    });
    this.moveEntry(next, node, this.min + 1, this.max - 1);
    const [midKey, midIndex] = this.getDataByIndex(node, this.min);
    const cursor = parent.insert(midKey, midIndex);
    cursor.getData().prev = prev;
    const cursorPrev = cursor.getPrevNode();
    if (cursorPrev !== null) {
      cursorPrev.getData().next = prev;
    }
    cursor.getData().next = next;
    const cursorNext = cursor.getNextNode();
    if (cursorNext !== null) {
      cursorNext.getData().prev = next;
    }

    return parent;
  }
  private getDataByIndex(srcNode: BNode<T, U>, index: number): [T, U] {
    let cursor = <LinkedNode<BLinkedNode<T, U>>>srcNode.getFirstLinkedNode();
    for (let i = 0; i < index; i++) {
      cursor = cursor.getNextNode() as LinkedNode<BLinkedNode<T, U>>;
    }
    return [cursor.getData().data.key, cursor.getData().data.index];
  }
  private moveEntry(
    tarNode: BNode<T, U>,
    srcNode: BNode<T, U>,
    startIndex: number,
    endIndex: number
  ) {
    let cursor = <LinkedNode<BLinkedNode<T, U>>>srcNode.getFirstLinkedNode();
    for (let i = 0; i < startIndex; i++) {
      cursor = cursor.getNextNode() as LinkedNode<BLinkedNode<T, U>>;
    }
    for (; startIndex <= endIndex; startIndex++) {
      const nextCursor = cursor.getNextNode();
      tarNode.insert(cursor.getData().data.key, cursor.getData().data.index);
      if (nextCursor === null) {
        break;
      }
      cursor = nextCursor;
    }
  }
  remove(key: T): void {
    console.log(key);
  }
  public get size(): number {
    return this._size;
  }
}
