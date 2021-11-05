import { pointer } from "Global";
export default class BinaryNode<T> {
  protected _parent: pointer<BinaryNode<T>>;
  protected _left: pointer<BinaryNode<T>>;
  protected _right: pointer<BinaryNode<T>>;
  protected _data: T;
  constructor(data: T) {
    this._parent = null;
    this._left = null;
    this._right = null;
    this._data = data;
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
