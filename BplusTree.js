import BplusNode from "./Node/BplusNode.js";

const BplusTree = {
  init: function init({ compareFunc, max = 3 }) {
    if (typeof compareFunc !== "function") {
      throw new Error(
        "When creating the BplusTree, you need to declare 'compareFunc' function"
      );
    }
    this._root = null;
    this._compareFunc = compareFunc;
    this._size = 0;
    this._max = max;
    this._min = Math.ceil(max / 2) - 1;
    this._firstLeaf = Object.create(BplusNode).init({ compareFunc });
    this._lastLeaf = Object.create(BplusNode).init({ compareFunc });
    this._firstLeaf.next = this._lastLeaf;
    this._lastLeaf.prev = this._firstLeaf;
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
    if (cursor === null) {
      return false;
    }
    while (!cursor.isLeaf) {
      const { keyIndex, childNode } = cursor.findKey(data);
      cursor = childNode;
    }
    const { keyIndex, childNode } = cursor.findKey(data);
    if (cursor[keyIndex] === data) {
      return { node: cursor, keyIndex };
    }
  },
  has: function has(data) {
    return !!this.find(data);
  },
  print: function print() {
    if (this.isEmpty()) {
      return false;
    }
    const result = [];
    let cursor = this._firstLeaf.next;
    while (cursor != this._lastLeaf) {
      const cursorKeydata = cursor.keys.map((val) => val.data);
      result.push(...cursorKeydata);
      cursor = cursor.next;
    }
    return result;
  },
  insert: function insert(data) {
    const compareFunc = this._compareFunc;
    ++this._size;
    let cursor = this._root;
    if (cursor === null) {
      this._root = Object.create(BplusNode).init({ isLeaf: true, compareFunc });
      this._root.insert(data);
      this._firstLeaf.next = this._root;
      this._root.prev = this._firstLeaf;
      this._lastLeaf.prev = this._root;
      this._root.next = this._lastLeaf;
      return true;
    }
    while (true) {
      if (cursor.size === this._max) {
        cursor = this._splitMaxNode(cursor);
      }
      if (cursor.isLeaf) {
        break;
      }
      cursor = cursor.findKey(data).childNode;
    }
    cursor.insert(data);
    return true;
  },
  _splitMaxNode: function _splitMaxNode(node) {
    const compareFunc = this._compareFunc;
    let splitIndex = this._min + 1;
    let parent = node.parent;
    if (node === this._root) {
      parent = Object.create(BplusNode).init({ compareFunc });
      this._root = parent;
    }

    const next = Object.create(BplusNode).init({
      compareFunc,
      isLeaf: node.isLeaf,
      parent,
    });
    next.keys = node.keys.slice(splitIndex);
    const prev = Object.create(BplusNode).init({
      compareFunc,
      isLeaf: node.isLeaf,
      parent,
    });
    if (!node.isLeaf) {
      --splitIndex;
    }
    prev.keys = node.keys.slice(0, splitIndex);
    this._link(next);
    this._link(prev);
    const insertIndex = parent.insert(node.keys[splitIndex].data);
    parent.keys[insertIndex].next = next;
    parent.keys[insertIndex].prev = prev;
    if (insertIndex > 0) {
      parent.keys[insertIndex - 1].next = prev;
    }
    if (insertIndex < parent.size - 1) {
      parent.keys[insertIndex + 1].prev = next;
    }
    if (node.isLeaf) {
      node.prev.next = prev;
      node.next.prev = next;
      prev.next = next;
      next.prev = prev;
      next.next = node.next;
      prev.prev = node.prev;
    }
    return parent;
  },
  _link: function _link(parent) {
    if (parent.isLeaf) {
      return true;
    }
    parent.keys[0].prev.parent = parent;
    for (let i = 0; i < parent.size; ++i) {
      parent.keys[i].next.parent = parent;
    }
    return true;
  },
  remove: function remove(data) {
    const nodePosition = this.find(data);
    if (!nodePosition) {
      return false;
    }
    const { node, keyIndex } = nodePosition;
    if (!this._reDistribute(node)) {
      this._merge();
    }
  },
  _reDistribute: function _reDistribute(node) {
    const { leftSiblingKeys, leftParentKey } = this._findLeftSibling(node);
    const { rightSiblingKeys, rightParentkey } = this._findRightSibling(node);
    const parent = node.parent;
    let fromIndex, toIndex;
    let fixKey, workKeys, fixEntry;
    const maxSiblingLen = Math.max(
      leftSiblingKeys.length,
      rightSiblingKeys.length
    );
    if (maxSiblingLen < this._min) {
      return false;
    }
    if (leftSiblingKeys.length > rightSiblingKeys.length) {
      fromIndex = leftSiblingKeys.length - 1;
      toIndex = 0;
      fixEntry = parent.keys[parent.findKey(node.keys[0]).keyIndex];
      fixKey = leftSiblingKeys.keys[fromIndex];
      workKeys = leftSiblingKeys;
    } else {
      fromIndex = 0;
      toIndex = node.length;
      fixEntry = parent.keys[parent.findKey(node.keys[toIndex]).keyIndex];
      fixKey = rightSiblingKeys.keys[1];
      workKeys = rightSiblingKeys;
    }
    fixEntry.data = fixKey.data;
    node.keys.splice(toIndex, 0, workKeys.keys[fromIndex]);
    workKeys.splice(fromIndex);
    return true;
  },
  _findLeftSiblingKeys: function _findLeftSiblingKeys(node) {
    const parent = node.parent;
    let leftSiblingKeys = [];
    let leftParentKey = null;
    if (parent.keys[0].prev === node) {
      return { leftSiblingKeys, leftParentKey };
    }
    let keyIndex = 0;
    for (; keyIndex < parent.size; ++keyIndex) {
      leftParentKey = parent.keys[keyIndex];
      if (leftParentKey.next === node) {
        leftSiblingKeys = leftParentKey.next.keys;
        break;
      }
    }
    if (keyIndex === 0) {
      leftSiblingKeys = parentKey.prev.keys;
    }
    return { leftSiblingKeys, leftParentKey };
  },
  _findRightSiblingKeys: function _findRightSiblingKeys(node) {
    const parent = node.parent;
    let rightSiblingKeys = [];
    let rightParentkey = parent.keys[0];

    for (let keyIndex = 0; keyIndex < parent.size; ++keyIndex) {
      rightParentkey = parent.keys[keyIndex];
      if (rightParentkey.prev === node) {
        rightSiblingKeys = rightParentkey.next.keys;
        return { rightSiblingKeys, rightParentkey };
      }
    }
    return { rightSiblingKeys: [], rightParentkey: null };
  },
};

export default BplusTree;
