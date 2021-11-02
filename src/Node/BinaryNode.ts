import { pointer } from "Global";
export default class BinaryNode<T> {
  private _parent: pointer<T>;
  private _left: pointer<T>;
  private _right: pointer<T>;
  constructor() {
    this._parent = null;
    this._left = null;
    this._right = null;
  }
  public get parent(): pointer<T> {
    return this._parent;
  }
  public set parent(value: pointer<T>) {
    this._parent = value;
  }
  public get left(): pointer<T> {
    return this._left;
  }
  public set left(value: pointer<T>) {
    this._left = value;
  }
  public get right(): pointer<T> {
    return this._right;
  }
  public set right(value: pointer<T>) {
    this._right = value;
  }
}
