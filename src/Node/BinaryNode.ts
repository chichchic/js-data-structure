import { pointer } from "Global";
interface node<T> {
  parent?: pointer<BinaryNode<T>>;
  left?: pointer<BinaryNode<T>>;
  right?: pointer<BinaryNode<T>>;
  data: T;
}
export default class BinaryNode<T> {
  protected _parent: pointer<BinaryNode<T>>;
  protected _left: pointer<BinaryNode<T>>;
  protected _right: pointer<BinaryNode<T>>;
  protected _data: T;
  constructor(source: node<T>) {
    this._parent = source.parent === undefined ? null : source.parent;
    this._left = source.left === undefined ? null : source.left;
    this._right = source.right === undefined ? null : source.right;
    this._data = source.data;
  }
  public get parent(): pointer<BinaryNode<T>> {
    return this._parent;
  }
  public set parent(value: pointer<BinaryNode<T>>) {
    this._parent = value;
  }
  public get left(): pointer<BinaryNode<T>> {
    return this._left;
  }
  public set left(value: pointer<BinaryNode<T>>) {
    this._left = value;
  }
  public get right(): pointer<BinaryNode<T>> {
    return this._right;
  }
  public set right(value: pointer<BinaryNode<T>>) {
    this._right = value;
  }
  public get data(): T {
    return this._data;
  }
  public set data(value: T) {
    this._data = value;
  }
}
