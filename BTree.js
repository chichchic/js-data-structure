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
    this._min = Math.ceil(max / 2) - 1;
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
  remove: function remove(targetNode, targetIndex) {
    if (!targetNode.isLeaf) {
      const [deletedNode, deletedIndex] = this._findMinimum(
        targetNode.keys[targetIndex].next
      );
      const targetData = targetNode.keys[targetIndex].data;
      targetNode.keys[targetIndex].data = deletedNode.keys[deletedIndex].data;
      deletedNode.keys[deletedIndex].data = targetData;
      return this.remove(deletedNode, deletedIndex);
    }
    if (targetNode.size > this._min || targetNode === this._root) {
      targetNode.keys.splice(targetIndex, 1);
      --this._size;
      if (this._size === 0) {
        this._root = null;
      }
      return true;
    }
    const [deletedNode, deleteData] = this._fusion(targetNode, targetIndex);
    --this._size;
    return this._removeByKeyData(deletedNode, deleteData);
  },
  _fusion: function _fusion(targetNode, targetIndex) {
    const { leftSiblingKeys, leftParentKey } =
      this._findLeftSibling(targetNode);
    const { rightSiblingKeys, rightParentkey } =
      this._findRightSibling(targetNode);
    const targetData = targetNode.keys[targetIndex].data;
    const parent = targetNode.parent;
    if (leftSiblingKeys.length > this._min) {
      this._getLeftSiblingKey(targetNode.keys, leftSiblingKeys, leftParentKey);
      return [targetNode, targetData];
    }
    if (rightSiblingKeys.length > this._min) {
      this._getRightSiblingKey(
        targetNode.keys,
        rightSiblingKeys,
        rightParentkey
      );
      return [targetNode, targetData];
    }
    if (parent.size > this._min || parent === this._root) {
      if (leftParentKey) {
        return [
          this._mergeNode(
            leftSiblingKeys,
            targetNode.keys,
            parent,
            leftParentKey
          ),
          targetData,
        ];
      }
      return [
        this._mergeNode(
          targetNode.keys,
          rightSiblingKeys,
          parent,
          rightParentkey
        ),
        targetData,
      ];
    }
    this._fusion(parent, 0);
    return this._fusion(targetNode, targetIndex);
  },
  _mergeNode: function _mergeNode(
    leftNodeKeys,
    rightNodeKeys,
    parent,
    parentIndex
  ) {
    const compareFunc = this._compareFunc;
    const mergedNode = Object.create(BNode).init({
      compareFunc,
      isLeaf: leftNodeKeys.isLeaf,
      parent,
    });
    const parentNodeKeys = parent.keys;
    if (parentIndex > 0) {
      parentNodeKeys[parentIndex - 1].next = mergedNode;
    }
    if (parentIndex < parentNodeKeys.length - 1) {
      parentNodeKeys[parentIndex + 1].prev = mergedNode;
    }
    parentNodeKeys[parentIndex].prev =
      leftNodeKeys[leftNodeKeys.length - 1].next;
    parentNodeKeys[parentIndex].next = rightNodeKeys[0].prev;
    mergedNode.keys = [
      ...leftNodeKeys,
      parentNodeKeys[parentIndex],
      ...rightNodeKeys,
    ];
    parentNodeKeys.splice(parentIndex);
    if (parentNodeKeys.length === 0) {
      this._root = mergedNode;
      mergedNode.parent = null;
    }
    return mergedNode;
  },
  _getLeftSiblingKey: function _getLeftSiblingKey(
    targetKeys,
    siblingKeys,
    parentKey
  ) {
    const siblingLastKey = siblingKeys[siblingKeys.length - 1];
    siblingLastKey.prev = siblingLastKey.next;
    siblingLastKey.next = targetKeys[0].prev;
    targetKeys.unshift(siblingLastKey);
    const parentData = parentKey.data;
    parentKey.data = siblingLastKey.data;
    siblingLastKey.data = parentData;
  },
  _getRightSiblingKey: function _getRightSiblingKey(
    targetKeys,
    siblingKeys,
    parentKey
  ) {
    const siblingFirstKey = siblingKeys[0];
    siblingFirstKey.next = siblingFirstKey.prev;
    siblingFirstKey.prev = targetKeys[targetKeys.length - 1].next;
    targetKeys.push(siblingFirstKey);
    const parentData = parentKey.data;
    parentKey.data = siblingFirstKey.data;
    siblingFirstKey.data = parentData;
  },
  _removeByKeyData: function _removeByKeyData(targetNode, targetData) {
    if (!targetNode.isLeaf) {
      console.error("wrong delete request");
      return false;
    }
    const newKeyIndex = targetNode.keys.findIndex(
      (val) => val.data === targetData
    );
    targetNode.keys.splice(newKeyIndex, 1);
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
  _findMaximum: function _findMaximum(node) {
    while (node.keys[node.size - 1].next !== null) {
      node = node.keys[node.size - 1].next;
    }
    return [node, node.size - 1];
  },
  _findMinimum: function _findMinimum(node) {
    while (node.keys[0].prev !== null) {
      node = node.keys[0].prev;
    }
    return [node, 0];
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
};

export default BTree;
