import { pointer } from "Global";
export default class BinaryNode<T> {
  private _parent: pointer<T, BinaryNode<T>>;
  private _left: pointer<T, BinaryNode<T>>;
  private _right: pointer<T, BinaryNode<T>>;
  private _data: T;
  constructor(data: T) {
    this._parent = null;
    this._left = null;
    this._right = null;
    this._data = data;
  }
  public get parent(): pointer<T, BinaryNode<T>> {
    return this._parent;
  }
  public set parent(value: pointer<T, BinaryNode<T>>) {
    this._parent = value;
  }
  public get left(): pointer<T, BinaryNode<T>> {
    return this._left;
  }
  public set left(value: pointer<T, BinaryNode<T>>) {
    this._left = value;
  }
  public get right(): pointer<T, BinaryNode<T>> {
    return this._right;
  }
  public set right(value: pointer<T, BinaryNode<T>>) {
    this._right = value;
  }
  public get data(): T {
    return this._data;
  }
  public set data(value: T) {
    this._data = value;
  }
}
