import { compareFuncType } from "Global";

export default class Heap<T> {
  private dataArray: Array<T>;
  private compareFunc: compareFuncType<T>;
  constructor(compareFunc: compareFuncType<T>) {
    this.compareFunc = compareFunc;
    this.dataArray = [];
  }
  top(): T {
    if (this.size === 0) {
      throw new ReferenceError("Error:: Heap is Empty");
    }
    return this.dataArray[0];
  }
  isEmpty(): boolean {
    return this.size === 0;
  }
  push(data: T): void {
    this.dataArray.push(data);
    let cursor = this.size - 1;
    while (cursor > 0) {
      const parentIndex = Math.floor((cursor - 1) / 2);
      if (!this.swap(parentIndex, cursor)) {
        break;
      }
      cursor = parentIndex;
    }
  }
  pop(): void {
    this.dataArray[0] = this.dataArray[this.size - 1];
    this.dataArray.pop();
    let cursor = 0;
    while (true) {
      const left = cursor * 2 + 1,
        right = cursor * 2 + 2;
      if (left >= this.size) {
        break;
      }
      const targetIndex =
        right >= this.size ||
        this.compareFunc(this.dataArray[left], this.dataArray[right])
          ? left
          : right;
      if (!this.swap(cursor, targetIndex)) {
        break;
      }
      cursor = targetIndex;
    }
  }
  private swap(parentIndex: number, childIndex: number): boolean {
    if (
      this.compareFunc(this.dataArray[childIndex], this.dataArray[parentIndex])
    ) {
      const temp = this.dataArray[parentIndex];
      this.dataArray[parentIndex] = this.dataArray[childIndex];
      this.dataArray[childIndex] = temp;
      return true;
    }
    return false;
  }
  get size(): number {
    return this.dataArray.length;
  }
}
