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
      this._link(this._root);
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
    this._link(parent);
    return parent;
  },
  remove: function remove(targetNode, targetNodeKeyIndex) {
    if (!targetNode.isLeaf) {
      const [deletedNode, deletedNodeKeyIndex] = this._findMinimum(
        targetNode.keys[targetNodeKeyIndex].next
      );
      const targetData = targetNode.keys[targetNodeKeyIndex].data;
      targetNode.keys[targetNodeKeyIndex].data =
        deletedNode.keys[deletedNodeKeyIndex].data;
      deletedNode.keys[deletedNodeKeyIndex].data = targetData;
      return this.remove(deletedNode, deletedNodeKeyIndex);
    }
    if (targetNode.size > 1 || targetNode === this._root) {
      targetNode.keys.splice(targetNodeKeyIndex, 1);
      --this._size;
      if (this._size === 0) {
        this._root = null;
      }
      return true;
    }
    const [deletedNode, deleteData] = this._fusion(
      targetNode,
      targetNodeKeyIndex
    );
    --this._size;
    return this._removeByKeyData(deletedNode, deleteData);
  },
  _fusion: function _fusion(targetNode, targetNodeKeyIndex) {
    const leftResult = this._findLeftSibling(targetNode);
    const rightResult = this._findRightSibling(targetNode);
    const parent = targetNode.parent;
    const targetData = targetNode.keys[targetNodeKeyIndex].data;
    if (leftResult && leftResult[0].size > 1) {
      const [leftSibling, nodeParentKeyIndex] = leftResult;
      const leftSiblingLast = leftSibling.keys[leftSibling.size - 1];
      const deletedData = leftSiblingLast.data;
      const leftSiblingLastNext = leftSiblingLast.next;
      leftSibling.keys.pop();
      targetNode.insert(parent.keys[nodeParentKeyIndex].data);
      parent.keys[nodeParentKeyIndex].data = deletedData;
      if (!targetNode.isLeaf) {
        targetNode.keys[0].prev = leftSiblingLastNext;
        targetNode.keys[0].next = targetNode.keys[1].prev;
        targetNode.keys[1].prev = null;
        this._link(targetNode);
      }
      return [targetNode, targetData];
    }
    if (rightResult && rightResult[0].size > 1) {
      const [rightSibling, rightParentKeyIndex] = rightResult;
      const rightSiblingFirst = rightSibling.keys[0];
      const deletedData = rightSiblingFirst.data;
      const rightSiblingFirstPrev = rightSiblingFirst.prev;
      const rightSiblingFirstNext = rightSiblingFirst.next;
      rightSibling.keys.shift();
      targetNode.insert(parent.keys[rightParentKeyIndex].data);
      parent.keys[rightParentKeyIndex].data = deletedData;
      if (!targetNode.isLeaf) {
        targetNode.keys[targetNode.size - 1].next = rightSiblingFirstPrev;
        rightSibling.keys[0].prev = rightSiblingFirstNext;
        this._link(targetNode);
        this._link(rightSibling);
      }
      return [targetNode, targetData];
    }
    if (parent.size === 1) {
      if (parent !== this._root) {
        this._fusion(parent, 0);
        return this._fusion(targetNode, targetNodeKeyIndex);
      }
      if (leftResult) {
        parent.keys.push(targetNode.keys[0]);
        parent.keys.unshift(leftResult[0].keys[0]);
      }
      if (rightResult) {
        parent.keys.push(rightResult[0].keys[0]);
        parent.keys.unshift(targetNode.keys[0]);
      }
      parent.keys[1].prev = null;
      parent.keys[1].next = parent.keys[2].prev;
      parent.keys[2].prev = null;
      parent.isLeaf = targetNode.isLeaf;
      this._link(parent);
      return [parent, targetData];
    }
    if (leftResult) {
      const [leftSibling, nodeParentKeyIndex] = leftResult;
      const leftParentKeyIndex =
        nodeParentKeyIndex === 0 ? 0 : nodeParentKeyIndex - 1;
      leftSibling.insert(parent.keys[nodeParentKeyIndex].data);
      leftSibling.insert(targetData);
      parent.keys.splice(nodeParentKeyIndex, 1);
      if (nodeParentKeyIndex === 0) {
        parent.keys[0].prev = leftSibling;
      }
      if (!leftSibling.isLeaf) {
        leftSibling.keys[1].next = targetNode.keys[0].prev;
        leftSibling.keys[2].next = targetNode.keys[0].next;
        this._link(leftSibling);
      }
      return [leftSibling, targetData];
    }
    const [rightSibling, rightParentKeyIndex] = rightResult;
    const nodeParentKeyIndex =
      rightParentKeyIndex === 0 ? 0 : rightParentKeyIndex - 1;
    targetNode.insert(parent.keys[nodeParentKeyIndex].data);
    targetNode.insert(rightSibling.keys[0].data);
    parent.keys.splice(rightParentKeyIndex, 1);
    if (rightParentKeyIndex === 0) {
      parent.keys[0].prev = targetNode;
    }
    if (!targetNode.isLeaf) {
      targetNode.keys[1].next = rightSibling.keys[0].prev;
      targetNode.keys[2].next = rightSibling.keys[0].next;
      this._link(targetNode);
    }
    return [targetNode, targetData];
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
  _findLeftSibling: function _findLeftSibling(node) {
    const parent = node.parent;
    if (parent.keys[0].prev === node) {
      return null;
    }
    let keyIndex = 0;
    for (; keyIndex < parent.size; ++keyIndex) {
      if (parent.keys[keyIndex].next === node) break;
    }
    if (keyIndex === 0) {
      return [parent.keys[0].prev, 0];
    }
    return [parent.keys[keyIndex - 1].next, keyIndex];
  },
  _findRightSibling: function _findRightSibling(node) {
    const parent = node.parent;
    if (parent.keys[0].prev === node) {
      return [parent.keys[0].next, 0];
    }
    for (let keyIndex = 0; keyIndex < parent.size; ++keyIndex) {
      if (parent.keys[keyIndex].next === node && keyIndex + 1 < parent.size) {
        return [parent.keys[keyIndex + 1].next, keyIndex + 1];
      }
    }
    return null;
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

export default ttfTree;
