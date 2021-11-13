export default class keyIndex<T, U> {
  private _key: T;
  private _index: U;
  constructor(key: T, index: U) {
    this._key = key;
    this._index = index;
  }
  public get key(): T {
    return this._key;
  }
  public get index(): U {
    return this._index;
  }
}
