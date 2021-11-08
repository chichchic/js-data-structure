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
    this.nill = new BinaryNode({
      data: null,
      left: this.nill,
      right: this.nill,
      parent: this.nill,
    });
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
  print() {
    const que = [this.root];
    let queIdx = 0;
    while (que.length > queIdx) {
      const cusor = que[queIdx] as pointer<BwithNullNode<T>>;
      if (cusor === null) {
        break;
      }
      console.log(cusor.data);
      if (cusor.left !== this.nill) {
        que.push(cusor.left);
      }
      if (cusor.right !== this.nill) {
        que.push(cusor.right);
      }
      queIdx++;
    }
  }
  insert(data: T): void {
    const newNode = new BinaryNode<T | null>({
      data: data,
      left: this.nill,
      right: this.nill,
    });
    let cursor = this.root;
    let parent: BwithNullNode<T> | null = null;
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
      this.setHeight(this.root);
      return;
    }
    this.link(parent, newNode, isLeft);
    this.setHeight(newNode);
    while (parent !== null && this.setHeight(parent)) {
      parent = parent.parent;
    }
    this.balanceTree(newNode);
  }
  private balanceTree(rotateCursor: BwithNullNode<T>) {
    while (true) {
      if (rotateCursor.left === null || rotateCursor.right === null) {
        throw new Error("Error: child is null");
      }
      const leftHeight = rotateCursor.left.height;
      const rightHeight = rotateCursor.right.height;
      const heightDiff = leftHeight - rightHeight;
      if (Math.abs(heightDiff) <= 1) {
        this.setHeight(rotateCursor);
      } else if (heightDiff < 0) {
        rotateCursor = this.setRightCase(rotateCursor);
      } else if (heightDiff > 0) {
        rotateCursor = this.setLeftCase(rotateCursor);
      }
      if (rotateCursor.parent === null) {
        this.setHeight(rotateCursor);
        this.root = rotateCursor;
        break;
      }
      rotateCursor = rotateCursor.parent;
    }
  }
  remove(data: T): boolean {
    console.log(data, "::::");
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
      if (this.compareFunc(cursor.data, data)) {
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
    this.balanceTree(parent);
    this.print();
    this._size--;
    return true;
  }
  private link(
    parent: BwithNullNode<T> | null,
    child: BwithNullNode<T>,
    isLeft: boolean
  ) {
    if (parent === null) {
      child.parent = null;
      return;
    }
    if (child !== this.nill) {
      child.parent = parent;
    }
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
  private setLeftCase(z: BwithNullNode<T>): BwithNullNode<T> {
    const y = z.left;
    if (y === null || y.left === null || y.right === null) {
      throw Error("Error:: leaf is null");
    }
    if (y.left.height < y.right.height) {
      this.rotateLeft(y);
      this.rotateRight(z);
    } else {
      this.rotateRight(z);
    }
    return y;
  }
  private setRightCase(z: BwithNullNode<T>): BwithNullNode<T> {
    const y = z.right;
    if (y === null || y.left === null || y.right === null) {
      throw Error("Error:: leaf is null");
    }
    if (y.left.height > y.right.height) {
      this.rotateRight(y);
      this.rotateLeft(z);
    } else {
      this.rotateLeft(z);
    }
    return y;
  }
  private rotateLeft(z: pointer<BwithNullNode<T>>): BwithNullNode<T> {
    if (z === null) {
      throw Error("Error:: leaf is null");
    }
    const y = z.right;
    if (y === null) {
      throw Error("Error:: leaf is null");
    }
    const T2 = y.left;
    if (T2 === null) {
      throw Error("Error:: leaf is null");
    }
    const isZleftChild =
      z.parent === null || z.parent.left === z ? true : false;
    this.link(z.parent, y, isZleftChild);
    this.link(y, z, true);
    this.link(z, T2, false);
    this.setHeight(z);
    this.setHeight(y);
    return y;
  }
  private rotateRight(z: pointer<BwithNullNode<T>>) {
    if (z === null) {
      throw Error("Error:: leaf is null");
    }
    const y = z.left;
    if (y === null) {
      throw Error("Error:: leaf is null");
    }
    const T2 = y.right;
    if (T2 === null) {
      throw Error("Error:: leaf is null");
    }
    const isZleftChild =
      z.parent === null || z.parent.left === z ? true : false;
    this.link(z.parent, y, isZleftChild);
    this.link(y, z, false);
    this.link(z, T2, true);
    this.setHeight(z);
    this.setHeight(y);
    return y;
  }
  private setHeight(node: pointer<BwithNullNode<T>>): boolean {
    if (node === null || node.left === null || node.right === null) {
      throw Error("Error:: leaf is null");
    }
    const beforeHeight = node.height;
    node.height = Math.max(node.left.height, node.right.height) + 1;
    if (beforeHeight === node.height) {
      return false;
    } else {
      return true;
    }
  }
  public get size(): number {
    return this._size;
  }
}
