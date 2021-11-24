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
    const result = this.findNodeByKey(key);
    if (result === null) {
      return null;
    }
    return result.data.getData().data.index;
  }
  insert(key: T, index: U): boolean {
    this._size++;
    if (this.root === null) {
      this.root = new BNode<T, U>({
        isLeaf: true,
        compareFunc: this.compareFunc,
      });
      this.root.insert(key, index);
      return true;
    }
    let cursor: BNode<T, U> | null = this.root;
    while (cursor !== null) {
      if (cursor.size === this.max) {
        cursor = this.split(cursor);
      }
      if (cursor.isLeaf) {
        cursor.insert(key, index);
        return true;
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
    return false;
  }
  private findNodeByKey(
    key: T
  ): { node: BNode<T, U>; data: LinkedNode<BLinkedNode<T, U>> } | null {
    let cursor = this.root;
    while (cursor !== null) {
      let innerCursor = cursor.getFirstLinkedNode();
      while (innerCursor != null) {
        const innerCurKey = (
          innerCursor as LinkedNode<BLinkedNode<T, U>>
        ).getData().data.key;
        if (innerCurKey === key) {
          return {
            node: cursor,
            data: innerCursor as LinkedNode<BLinkedNode<T, U>>,
          };
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
  private split(node: BNode<T, U>) {
    const parent: BNode<T, U> =
      node.parent === null
        ? new BNode<T, U>({
            compareFunc: this.compareFunc,
            isLeaf: false,
          })
        : node.parent;
    if (node === this.root) {
      this.root = parent;
    }
    const prev = new BNode<T, U>({
      compareFunc: this.compareFunc,
      isLeaf: node.isLeaf,
      parent,
    });
    this.moveEntry(prev, node, 0, this.min - 1);
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
    targetNode: BNode<T, U>,
    srcNode: BNode<T, U>,
    startIndex: number,
    endIndex: number
  ) {
    let cursor = srcNode.getFirstLinkedNode();
    if (cursor === null) {
      throw Error("Error:: cursor is null");
    }
    for (let i = 0; i < startIndex; i++) {
      cursor = cursor.getNextNode() as LinkedNode<BLinkedNode<T, U>>;
    }
    for (; startIndex <= endIndex; startIndex++) {
      const node = targetNode.insert(
        cursor.getData().data.key,
        cursor.getData().data.index
      );
      node.getData().prev = cursor.getData().prev;
      node.getData().next = cursor.getData().next;
      const nextCursor = cursor.getNextNode();
      if (nextCursor === null) {
        break;
      }
      cursor = nextCursor;
    }
  }
  remove(key: T, targetNode = this.root): boolean {
    if (targetNode === null) {
      return false;
    }
    if (!targetNode.isLeaf) {
      let findResult = this.findNodeByKey(key);
      if (findResult === null) {
        return false;
      }
      const { node, data } = this.findDeleteTarget(targetNode, key);
      const temp = findResult.data.getData().data;
      findResult.data.getData().data = data.getData().data;
      data.getData().data = temp;
      return this.remove(key, node);
    }
    if (targetNode.size > this.min || targetNode === this.root) {
      if (!targetNode.remove(key)) {
        return false;
      }
      if (this.size === 1) {
        this.root = null;
      }
      this._size--;
      return true;
    }
    if (!this.borrow(targetNode)) {
      this.merge(targetNode);
    }
    targetNode.remove(key);
    this._size--;
    return true;
  }
  private findDeleteTarget(
    node: BNode<T, U>,
    key: T
  ): { node: BNode<T, U>; data: LinkedNode<BLinkedNode<T, U>> } {
    let cursor = node.getFirstLinkedNode() as LinkedNode<BLinkedNode<T, U>>;
    while (
      cursor.getNextNode() !== null &&
      (cursor.getNextNode() as LinkedNode<BLinkedNode<T, U>>).getData().data
        .key < key
    ) {
      cursor = cursor.getNextNode() as LinkedNode<BLinkedNode<T, U>>;
    }
    let leftChild = cursor.getData().prev as BNode<T, U>;
    while (!leftChild.isLeaf) {
      leftChild = (
        leftChild.getLastLinkedNode() as LinkedNode<BLinkedNode<T, U>>
      ).getData().next as BNode<T, U>;
    }
    return {
      node: leftChild,
      data: leftChild.getLastLinkedNode() as LinkedNode<BLinkedNode<T, U>>,
    };
  }
  private borrow(node: BNode<T, U>): boolean {
    const { leftSibling, rightSibling, parent } = this.getSibling(node);
    if (leftSibling !== null && leftSibling.size > this.min) {
      const leftSiblingLastData = (
        leftSibling.getLastLinkedNode() as LinkedNode<BLinkedNode<T, U>>
      ).getData().data;
      leftSibling.remove(leftSiblingLastData.key);
      node.insert(parent.getData().data.key, parent.getData().data.index);
      parent.getData().data = leftSiblingLastData;
      return true;
    }
    if (rightSibling !== null && rightSibling.size > this.min) {
      const rightSiblingFirstData = (
        rightSibling.getFirstLinkedNode() as LinkedNode<BLinkedNode<T, U>>
      ).getData().data;
      rightSibling.remove(rightSiblingFirstData.key);
      node.insert(parent.getData().data.key, parent.getData().data.index);
      parent.getData().data = rightSiblingFirstData;
      return true;
    }
    return false;
  }
  private merge(node: BNode<T, U>): void {
    const { leftSibling, rightSibling, parent } = this.getSibling(node);
    if (leftSibling !== null) {
      const parentData = parent.getData().data;
      (node.parent as BNode<T, U>).remove(parent.getData().data.key);
      node.insert(parentData.key, parentData.index);
      let cursor: LinkedNode<BLinkedNode<T, U>> | null =
        leftSibling.getFirstLinkedNode() as LinkedNode<BLinkedNode<T, U>>;
      while (cursor !== null) {
        node.insert(cursor.getData().data.key, cursor.getData().data.index);
      }
    } else {
      if (rightSibling !== null) {
        const parentData = parent.getData().data;
        (node.parent as BNode<T, U>).remove(parent.getData().data.key);
        node.insert(parentData.key, parentData.index);
        let cursor: LinkedNode<BLinkedNode<T, U>> | null =
          rightSibling.getFirstLinkedNode() as LinkedNode<BLinkedNode<T, U>>;
        while (cursor !== null) {
          node.insert(cursor.getData().data.key, cursor.getData().data.index);
        }
      }
    }
  }
  private getSibling(node: BNode<T, U>): {
    leftSibling: BNode<T, U> | null;
    rightSibling: BNode<T, U> | null;
    parent: LinkedNode<BLinkedNode<T, U>>;
  } {
    const parent = node.parent as BNode<T, U>;
    let cursor: LinkedNode<BLinkedNode<T, U>> | null =
      parent.getFirstLinkedNode();
    let leftSibling: BNode<T, U> | null = null;
    let rightSibling: BNode<T, U> | null = null;
    while (cursor !== null) {
      if ((cursor as LinkedNode<BLinkedNode<T, U>>).getData().prev === node) {
        break;
      }
      cursor = cursor.getNextNode();
    }
    if (cursor === null) {
      cursor = parent.getLastLinkedNode() as LinkedNode<BLinkedNode<T, U>>;
      leftSibling = cursor.getData().prev;
    } else {
      rightSibling = cursor.getData().next;
      const cursorPrev = cursor.getPrevNode();
      if (cursorPrev !== null) {
        leftSibling = cursorPrev.getData().prev;
      }
    }
    return { leftSibling, rightSibling, parent: cursor };
  }
  public get size(): number {
    return this._size;
  }
}
