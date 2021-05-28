const Heap = {
  init: function init({ compareFunc }) {
    if (typeof compareFunc !== "function") {
      throw new Error(
        "When creating the Heap, you need to declare 'compareFunc' function"
      );
    }
    this.compareFunc = compareFunc;
    this._dataStore = [];
    return this;
  },
  top: function top() {
    if (this.isEmpty()) {
      return false;
    }
    return this._dataStore[0];
  },
  isEmpty: function isEmpty() {
    return this._dataStore.length === 0;
  },
  size: function size() {
    return this._dataStore.length;
  },
  push: function push(data) {
    const dataStore = this._dataStore;
    dataStore.push(data);
    let cursor = dataStore.length - 1;
    while (cursor !== 0) {
      const parent = Math.floor((cursor - 1) / 2);
      if (!this.compareFunc(dataStore[cursor], dataStore[parent])) {
        break;
      }
      this._swap(cursor, parent);
      cursor = parent;
    }
    return true;
  },
  pop: function pop() {
    if (this.isEmpty()) {
      return false;
    }
    let cursor = 0;
    const dataStore = this._dataStore;
    this._swap(cursor, dataStore.length - 1);
    dataStore.pop();
    while (true) {
      const left = cursor * 2 + 1,
        right = cursor * 2 + 2;
      if (dataStore[left] === undefined) {
        break;
      }
      const target =
        dataStore[right] === undefined ||
        this.compareFunc(dataStore[left], dataStore[right])
          ? left
          : right;
      if (!this.compareFunc(dataStore[target], dataStore[cursor])) {
        break;
      }
      this._swap(cursor, target);
      cursor = target;
    }
    return true;
  },
  _swap: function _swap(a, b) {
    const temp = this._dataStore[a];
    this._dataStore[a] = this._dataStore[b];
    this._dataStore[b] = temp;
  },
};

export default Heap;
