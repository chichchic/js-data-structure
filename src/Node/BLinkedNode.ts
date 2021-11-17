import keyIndex from "@src/Node/keyIndex";
import BNode from "@src/Node/BNode";

interface node<T, U> {
  prev?: BNode<T, U>;
  next?: BNode<T, U>;
  data: keyIndex<T, U>;
}
export default class BLinkedNode<T, U> {
  private _data: keyIndex<T, U>;
  private _prev: BNode<T, U> | null;
  private _next: BNode<T, U> | null;
  constructor(source: node<T, U>) {
    this._data = source.data;
    this._prev = source.prev == undefined ? null : source.prev;
    this._next = source.next == undefined ? null : source.next;
  }
  public get data(): keyIndex<T, U> {
    return this._data;
  }
  public set data(value: keyIndex<T, U>) {
    this._data = value;
  }
  public get prev(): BNode<T, U> | null {
    return this._prev;
  }
  public set prev(value: BNode<T, U> | null) {
    this._prev = value;
  }
  public get next(): BNode<T, U> | null {
    return this._next;
  }
  public set next(value: BNode<T, U> | null) {
    this._next = value;
  }
}
