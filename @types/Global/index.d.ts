declare module "Global" {
  export type compareFuncType<T> = (a: T, b: T) => boolean;
  export type pointer<T> = T | null;
  export interface node<T> {
    parent?: pointer<BinaryNode<T>>;
    left?: pointer<BinaryNode<T>>;
    right?: pointer<BinaryNode<T>>;
    height?: number;
    data: T;
  }
  export class keyIndex<T, U> {
    private _key: T;
    private _index: U;
    constructor(key: T, index: U) {
      this.key = key;
      this.index = index;
    }
    public get key(): T {
      return this._key;
    }
    public get index(): U {
      return this._index;
    }
  }
}
