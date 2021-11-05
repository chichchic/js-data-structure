import { compareFuncType, pointer } from "Global";
import BinaryNode from "./Node/BinaryNode";
type BwithNullNode<T> = BinaryNode<T | null>;
export default class BinarySearchTree<T> {
  private nill: BwithNullNode<T>;
  private root: pointer<BwithNullNode<T>>;
  private _size: number;
  private compareFunc: compareFuncType<T | null>;
  constructor(compareFunc: compareFuncType<T | null>) {
    this._size = 0;
    this.nill = new BinaryNode({ data: null });
    this.root = this.nill;
    this.compareFunc = compareFunc;
  }
  isEmpty(): boolean {
    return this.size === 0;
  }
  have(data: T): boolean {
    let cursor = this.root;
    while (cursor !== this.nill) {
      if (cursor === null) {
        throw Error("Error:: cursor is null");
      }
      if (cursor.data === data) {
        return true;
      }
      cursor = this.compareFunc(cursor.data, data) ? cursor.left : cursor.right;
    }
    return false;
  }
  insert(data: T): void {
    const newNode = new BinaryNode<T | null>({
      data,
      left: this.nill,
      right: this.nill,
    });
    let cursor = this.root;
    let parent = null;
    let isLeft = true;
    while (cursor !== this.nill) {
      if (cursor === null) {
        throw Error("Error:: cursor is null");
      }
      isLeft = this.compareFunc(cursor.data, data);
      parent = cursor;
      cursor = isLeft ? cursor.left : cursor.right;
    }

    this._size++;
    if (parent === null) {
      this.root = newNode;
      return;
    }
    this.link(parent, newNode, isLeft);
  }
  remove(data: T): boolean {
    let deletedNode: BwithNullNode<T>,
      targetNode: BwithNullNode<T>,
      cursor = this.root;
    if (cursor === null) {
      throw Error("Error:: cursor is null");
    }
    while (cursor !== this.nill) {
      if (cursor === null || cursor.left === null) {
        throw Error("Error:: cursor is null");
      }
      if (cursor.data === data) {
        break;
      }
      if (this.compareFunc(cursor.data, cursor.left.data)) {
        cursor = cursor.left;
      } else {
        cursor = cursor.right;
      }
    }
    if (cursor === this.nill) {
      this._size--;
      return false;
    }
    targetNode = cursor;
    if (cursor.left === this.nill && cursor.right === this.nill) {
      deletedNode = cursor;
    } else if (cursor.right === this.nill) {
      if (cursor.left === null) {
        throw Error("Error:: cursor is null");
      }
      deletedNode = this.findBiggestChild(cursor.left);
    } else {
      if (cursor.right === null) {
        throw Error("Error:: cursor is null");
      }
      deletedNode = this.findSmallestChild(cursor.right);
    }
    if (deletedNode === this.root) {
      this.root = this.nill;
      this._size--;
      return true;
    }
    targetNode.data = deletedNode.data;
    const parent = deletedNode.parent;
    if (parent === null) {
      throw Error("Error:: cursor is null");
    }
    const isLeft = parent.left === deletedNode ? true : false;
    if (isLeft) {
      parent.left = this.nill;
    } else {
      parent.right = this.nill;
    }
    this._size--;
    return true;
  }
  private link(
    parent: BwithNullNode<T>,
    child: BwithNullNode<T>,
    isLeft: boolean
  ) {
    child.parent = parent;
    if (isLeft) {
      parent.left = child;
    } else {
      parent.right = child;
    }
  }
  private findSmallestChild(node: BwithNullNode<T>): BwithNullNode<T> {
    if (node.left === this.nill) {
      return node;
    }
    if (node.left === null) {
      throw Error("Error:: leaf is null");
    }
    return this.findSmallestChild(node.left);
  }
  private findBiggestChild(node: BwithNullNode<T>): BwithNullNode<T> {
    if (node.right === this.nill) {
      return node;
    }
    if (node.right === null) {
      throw Error("Error:: leaf is null");
    }
    return this.findBiggestChild(node.right);
  }
  public get size(): number {
    return this._size;
  }
}
