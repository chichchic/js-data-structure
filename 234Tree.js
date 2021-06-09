import ttfNode from "./Node/234Node.js";

const ttfTree = {
  init: function init({ compareFunc }) {
    if (typeof compareFunc !== "function") {
      throw new Error(
        "When creating the 2-3-4Tree, you need to declare 'compareFunc' function"
      );
    }
    this._root = null;
    this._compareFunc = compareFunc;
    this._size = 0;
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
    let keyIndex;
    while (cursor !== null) {
      keyIndex = 0;
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
      this._root = Object.create(ttfNode).init({ isLeaf: true, compareFunc });
      this._root.insert(data);
      return true;
    }
    let cursor = this._root;
    while (cursor !== null) {
      if (cursor.size === 3) {
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
    if (node === this._root) {
      this._root = Object.create(ttfNode).init({ compareFunc });
      this._root.insert(node.keys[1].data);
      const next = Object.create(ttfNode).init({
        isLeaf: node.isLeaf,
        compareFunc,
        parent: this._root,
      });
      next.keys.push(node.keys[2]);
      if (!node.isLeaf) {
        node.keys[2].next.parent = next;
      }
      this._root.keys[0].next = next;
      this._root.keys[0].prev = node;
      next.keys[0].prev = node.keys[1].next;
      if (next.keys[0].prev !== null) {
        next.keys[0].prev.parent = next;
      }
      node.parent = this._root;
      node.keys.splice(1);
      return this._root;
    }
    const parent = node.parent;
    const insertIndex = parent.insert(node.keys[1].data);
    const next = Object.create(ttfNode).init({
      isLeaf: node.isLeaf,
      compareFunc,
      parent,
    });
    next.keys.push(node.keys[2]);
    if (!node.isLeaf) {
      node.keys[2].next.parent = next;
    }
    if (insertIndex === 0) {
      parent.keys[insertIndex].prev = node;
      parent.keys[insertIndex].prev.parent = parent;
    }
    parent.keys[insertIndex].next = next;
    next.keys[0].prev = node.keys[1].next;
    if (next.keys[0].prev !== null) {
      next.keys[0].prev.parent = next;
    }
    node.keys.splice(1);
    return parent;
  },
  remove: function remove(data) {
    if (!this.has(data)) {
      return false;
    }
  },
};

export default ttfTree;
