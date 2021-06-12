import BNode from "./Node/BNode.js";

//NOTE: 홀수 개수의 값을 가지는 BNode.
const BTree = {
  init: function init({ compareFunc, max = 3 }) {
    if (typeof compareFunc !== "function") {
      throw new Error(
        "When creating the BTree, you need to declare 'compareFunc' function"
      );
    }
    this._root = null;
    this._compareFunc = compareFunc;
    this._size = 0;
    this._max = max;
    return this;
  },
  isEmpty: function isEmpty() {
    return this._size === 0;
  },
  size: function size() {
    return this._size;
  },
  find: function find(data) {
    let cursor = this._root;
    while (cursor !== null) {
      let keyIndex = 0;
      if (this._compareFunc(data, cursor.keys[keyIndex].data)) {
        cursor = cursor.keys[keyIndex].prev;
        continue;
      }
      for (; keyIndex < cursor.size; ++keyIndex) {
        if (cursor.keys[keyIndex].data === data) {
          return [cursor, keyIndex];
        }
        if (this._compareFunc(data, cursor.keys[keyIndex].data)) {
          break;
        }
      }
      cursor = cursor.keys[keyIndex - 1].next;
    }
    return false;
  },
  has: function has(data) {
    return !!this.find(data);
  },
  print: function print() {
    if (this.isEmpty()) {
      return false;
    }
    const result = [];
    this._inorderTraversal(result, this._root);
    return result;
  },
  _inorderTraversal: function _inorderTraversal(result, node) {
    if (node === null) {
      return true;
    }
    let childIndex = 0;
    _inorderTraversal(result, node.keys[childIndex].prev);
    for (; childIndex < node.size; ++childIndex) {
      result.push(node.keys[childIndex].data);
      _inorderTraversal(result, node.keys[childIndex].next);
    }
    return true;
  },
  insert: function insert(data) {
    const compareFunc = this._compareFunc;
    ++this._size;
    if (this._root === null) {
      this._root = Object.create(BNode).init({ isLeaf: true, compareFunc });
      this._root.insert(data);
      return true;
    }
    let cursor = this._root;
    while (cursor !== null) {
      if (cursor.size === this.max) {
        cursor = this._split(cursor);
      }
      if (cursor.isLeaf) {
        cursor.insert(data, this.compareFunc);
        break;
      }
      if (compareFunc(data, cursor.keys[0].data)) {
        cursor = cursor.keys[0].prev;
        continue;
      }
      let keyIndex = 1;
      for (; keyIndex < cursor.size; ++keyIndex) {
        if (compareFunc(data, cursor.keys[keyIndex].data)) {
          break;
        }
      }
      cursor = cursor.keys[keyIndex - 1].next;
    }
  },
  _split: function _split(node) {
    const compareFunc = this._compareFunc;
    const parent =
      node === this._root
        ? Object.create(BNode).init({ compareFunc })
        : node.parent;
    const mid = Math.floor(this._max / 2);
    const insertIndex = parent.insert(node.keys[mid].data);
    const next = Object.create(BNode).init({
      compareFunc,
      isLeaf: node.isLeaf,
      parent,
    });
    next.keys = node.keys.slice(mid + 1);
    const prev = Object.create(BNode).init({
      compareFunc,
      isLeaf: node.isLeaf,
      parent,
    });
    prev.keys = node.keys.slice(0, 2);
    parent.keys[insertIndex].next = next;
    parent.keys[insertIndex].prev = prev;
    if (insertIndex > 0) {
      this.keys[insertIndex - 1].next = prev;
    }
    if (insertIndex < parent.size - 1) {
      this.keys[insertIndex + 1].prev = next;
    }
    return parent;
  },
  remove: function remove(data) {},
};

export default BTree;
