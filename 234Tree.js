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
    const dataPostion = this.find(data);
    if (!dataPostion) {
      return false;
    }
    --this._size;
    let [cursor, keyIndex] = dataPostion;
    const target = cursor.keys[keyIndex];
    if (!cursor.isLeaf) {
      cursor = target.next;
    }
    while (!cursor.isLeaf) {
      if (cursor.size > 1) {
        cursor = cursor.keys[0].prev;
        continue;
      }
      cursor = this._fusion(cursor);
      const tempIndex = cursor.keys.findIndex((val) => data === val.data);
      if (tempIndex > -1) {
        cursor = cursor.keys[tempIndex].next;
      }
    }
    if (cursor !== this._root && cursor.size === 1) {
      cursor = this._fusion(cursor);
    }
    const targetIndex = cursor.keys.findIndex((val) => data === val.data);
    if (targetIndex > -1) {
      cursor.keys.splice(targetIndex, 1);
      if (this._size === 0) {
        this._root = null;
      }
      return true;
    }
    target.data = cursor.keys[0].data;
    cursor.keys.shift();
    return true;
  },
  _fusion: function _fusion(node) {
    let parent = node.parent;
    if (parent !== this._root && parent.size === 1) {
      parent = this._fusion(parent);
    }
    const currentData = node.keys[0].data;
    let leftSibling = null;
    let rightSibling = null;
    let leftParent = null;
    let rightParent = null;
    let nodeParent;
    let keyIndex = 0;
    for (; keyIndex < parent.size; ++keyIndex) {
      if (this._compareFunc(currentData, parent.keys[keyIndex].data)) {
        if (keyIndex === 0) {
          nodeParent = parent.keys[0];
          rightSibling = parent.keys[0].next;
          rightParent = parent.keys[0];
        } else if (keyIndex === 1) {
          nodeParent = parent.keys[0];
          rightSibling = parent.keys[1].next;
          rightParent = parent.keys[1];
          leftSibling = parent.keys[0].prev;
          leftParent = parent.keys[0];
        } else {
          nodeParent = parent.keys[1];
          rightSibling = parent.keys[2].next;
          rightParent = parent.keys[2];
          leftSibling = parent.keys[0].next;
          leftParent = parent.keys[0];
        }
        break;
      }
    }
    if (!rightSibling) {
      nodeParent = parent.keys[keyIndex - 1];
      if (keyIndex === 1) {
        leftSibling = parent.keys[0].prev;
        leftParent = parent.keys[0];
      } else {
        leftSibling = parent.keys[keyIndex - 2].next;
        leftParent = parent.keys[keyIndex - 2];
      }
    }
    if (leftSibling && leftSibling.size > 1) {
      const nodeParentData = nodeParent.data;
      nodeParent.data = leftSibling.keys[leftSibling.size - 1].data;
      const leftSiblingLastNext = leftSibling.keys[leftSibling.size - 1].next;
      leftSibling.keys.pop();
      node.insert(nodeParentData);
      node.keys[0].prev = leftSiblingLastNext;
      if (leftSiblingLastNext) {
        leftSiblingLastNext.parent = node;
      }
      node.keys[0].next = node.keys[1].prev;
      node.keys[1].prev = null;
      return node;
    } else if (rightSibling && rightSibling.size > 1) {
      const rightParentData = rightParent.data;
      rightParent.data = rightSibling.keys[0].data;
      const rightSiblingPrev = rightSibling.keys[0].prev;
      rightSibling.keys[1].prev = rightSibling.keys[0].next;
      rightSibling.keys.shift();
      node.insert(rightParentData);
      const lastIndex = node.size - 1;
      node.keys[lastIndex].next = rightSiblingPrev;
      if (rightSiblingPrev) {
        rightSiblingPrev.parent = node;
      }
      return node;
    } else if (parent.size > 1) {
      if (leftSibling !== null) {
        const nodeParentIndex = parent.keys.findIndex(
          (val) => val.data === nodeParent.data
        );
        parent.keys.splice(nodeParentIndex, 1);
        leftSibling.insert(nodeParent.data);
        leftSibling.insert(currentData);
        if (node.keys[0].prev) {
          node.keys[0].prev.parent = leftSibling;
        }
        leftSibling.keys[1].next = node.keys[0].prev;
        if (node.keys[0].next) {
          node.keys[0].next.parent = leftSibling;
        }
        leftSibling.keys[2].next = node.keys[0].next;
        if (nodeParentIndex === 0) {
          parent.keys[0].prev = leftSibling;
          leftSibling.parent = parent;
        }
        return leftSibling;
      } else {
        node.insert(rightSibling.keys[0].data);
        node.insert(nodeParent.data);
        node.keys[1].next = rightSibling.keys[0].prev;
        if (node.keys[1].next) {
          node.keys[1].next.parent = node;
        }
        node.keys[2].next = rightSibling.keys[0].next;
        if (node.keys[2].next) {
          node.keys[2].next.parent = node;
        }
        parent.keys.shift();
        parent.keys[0].prev = node;
        return node;
      }
    } else {
      parent.isLeaf = node.isLeaf;
      if (rightSibling !== null) {
        parent.keys.unshift(node.keys[0]);
        parent.keys.push(rightSibling.keys[0]);
        parent.keys[1].next = rightSibling.keys[0].prev;
      } else {
        parent.keys.unshift(leftSibling.keys[0]);
        parent.keys.push(node.keys[0]);
        parent.keys[1].next = node.keys[0].prev;
      }
      parent.keys[1].prev = null;
      parent.keys[2].prev = null;
      this._link(parent);
      return parent;
    }
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
