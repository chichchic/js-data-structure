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
    const keyIndex = cursor.keys.findIndex((val) => val.data === data);
    if (keyIndex >= 0) {
      return { node: cursor, keyIndex };
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
    let { node, keyIndex } = nodePosition;
    --this._size;
    if (this._size === 0) {
      this._root = null;
      return true;
    }
    if (node === this._root) {
      node.keys.splice(keyIndex, 1);
      return true;
    }
    if (node.size === this._min) {
      node = this._fixNode(node);
    }
    this._removeByKeyData(node, data);
    return true;
  },
  _removeByKeyData: function _removeByKeyData(node, data) {
    if (!node.isLeaf) {
      console.error("Wrong request");
      return false;
    }
    const targeIndex = node.keys.findIndex((val) => val.data === data);
    if (targeIndex < 0) {
      console.error("Can't find data");
      return false;
    }
    node.keys.splice(targeIndex, 1);
    return true;
  },
  _fixNode: function fixNode(node) {
    if (!this._reDistribute(node)) {
      return this._merge(node);
    }
    return node;
  },
  _merge: function _merge(node) {
    let parent = node.parent;
    if (parent.size <= this._min && parent !== this._root) {
      parent = this._fixNode(parent);
      this._link(parent);
    }
    const { leftSibling, leftSiblingKeys, leftKeyIndex } =
      this._findLeftSiblingKeys(node);
    const { rightSibling, rightSiblingKeys, rightKeyIndex } =
      this._findRightSiblingKeys(node);
    let mergedNode;
    if (leftKeyIndex >= 0) {
      mergedNode = this._mergeNode(
        leftSiblingKeys,
        node.keys,
        parent,
        leftKeyIndex,
        node.isLeaf,
        leftSibling,
        node
      );
    } else {
      mergedNode = this._mergeNode(
        node.keys,
        rightSiblingKeys,
        parent,
        parent.findKey(node.keys[node.keys.length - 1].data).keyIndex,
        node.isLeaf,
        node,
        rightSibling
      );
    }
    if (parent.size === 0) {
      this._root = mergedNode;
      mergedNode.parent = null;
    }
    return mergedNode;
  },
  _mergeNode: function _mergeNode(
    leftNodeKeys,
    rightNodeKeys,
    parent,
    parentIndex,
    isLeaf,
    leftNode,
    rightNode
  ) {
    const compareFunc = this._compareFunc;
    const mergedNode = Object.create(BplusNode).init({
      compareFunc,
      isLeaf,
      parent,
    });
    const parentNodeKeys = parent.keys;
    if (parentIndex > 0) {
      parentNodeKeys[parentIndex - 1].next = mergedNode;
    }
    if (parentIndex < parentNodeKeys.length - 1) {
      parentNodeKeys[parentIndex + 1].prev = mergedNode;
    }
    if (!isLeaf) {
      parentNodeKeys[parentIndex].prev =
        leftNodeKeys[leftNodeKeys.length - 1].next;
      parentNodeKeys[parentIndex].next = rightNodeKeys[0].prev;
      mergedNode.keys = [parentNodeKeys[parentIndex]];
    } else {
      mergedNode.next = rightNode.next;
      mergedNode.prev = leftNode.prev;
      leftNode.prev.next = mergedNode;
      rightNode.next.prev = mergedNode;
    }
    mergedNode.keys.unshift(...leftNodeKeys);
    mergedNode.keys.push(...rightNodeKeys);
    parentNodeKeys.splice(parentIndex, 1);
    this._link(mergedNode);
    return mergedNode;
  },
  _reDistribute: function _reDistribute(node) {
    const parent = node.parent;
    const { leftSiblingKeys, leftParentKey } = this._findLeftSiblingKeys(node);
    const { rightSiblingKeys, rightParentkey } =
      this._findRightSiblingKeys(node);
    let fromIndex, toIndex;
    let fixKey, workKeys, fixEntry;
    const maxSiblingLen = Math.max(
      leftSiblingKeys.length,
      rightSiblingKeys.length
    );
    if (maxSiblingLen <= this._min) {
      return false;
    }
    if (leftSiblingKeys.length > rightSiblingKeys.length) {
      fromIndex = leftSiblingKeys.length - 1;
      toIndex = 0;
      fixEntry = leftParentKey;
      fixKey = leftSiblingKeys[fromIndex];
      workKeys = leftSiblingKeys;
      workKeys[fromIndex].prev = workKeys[fromIndex].next;
      workKeys[fromIndex].next = node.keys[toIndex].prev;
    } else {
      fromIndex = 0;
      toIndex = node.keys.length;
      fixEntry =
        parent.keys[parent.findKey(node.keys[toIndex - 1].data).keyIndex];
      fixKey = node.isLeaf ? rightSiblingKeys[1] : rightSiblingKeys[0];
      workKeys = rightSiblingKeys;
      workKeys[fromIndex].next = workKeys[fromIndex].prev;
      workKeys[fromIndex].prev = node.keys[toIndex - 1].next;
    }
    node.keys.splice(toIndex, 0, workKeys[fromIndex]);
    const fixKeyData = fixKey.data;
    if (!node.isLeaf) {
      node.keys[toIndex].data = fixEntry.data;
    }
    fixEntry.data = fixKeyData;
    workKeys.splice(fromIndex, 1);
    this._link(node);
    return true;
  },
  _findLeftSiblingKeys: function _findLeftSiblingKeys(node) {
    const parent = node.parent;
    let leftSiblingKeys = [];
    let leftParentKey = null;
    let leftKeyIndex = -1;
    if (parent.keys[0].prev === node) {
      return {
        leftSibling: null,
        leftSiblingKeys,
        leftParentKey,
        leftKeyIndex,
      };
    }
    ++leftKeyIndex;
    for (; leftKeyIndex < parent.size; ++leftKeyIndex) {
      leftParentKey = parent.keys[leftKeyIndex];
      if (leftParentKey.next === node) {
        leftSiblingKeys = leftParentKey.prev.keys;
        break;
      }
    }
    return {
      leftSibling: leftParentKey.prev,
      leftSiblingKeys,
      leftParentKey,
      leftKeyIndex,
    };
  },
  _findRightSiblingKeys: function _findRightSiblingKeys(node) {
    const parent = node.parent;
    let rightSiblingKeys = [];
    let rightParentkey = parent.keys[0];
    let rightKeyIndex = 0;
    for (; rightKeyIndex < parent.size; ++rightKeyIndex) {
      rightParentkey = parent.keys[rightKeyIndex];
      if (rightParentkey.prev === node) {
        rightSiblingKeys = rightParentkey.next.keys;
        return {
          rightSibling: rightParentkey.next,
          rightSiblingKeys,
          rightParentkey,
          rightKeyIndex,
        };
      }
    }
    return {
      rightSibling: null,
      rightSiblingKeys: [],
      rightParentkey: null,
      rightKeyIndex: -1,
    };
  },
};

export default BplusTree;
