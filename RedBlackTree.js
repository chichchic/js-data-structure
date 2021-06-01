"use strict";

import BinaryNode from "./Node/BinaryNode.js";
import Stack from "./Stack.js";

const RedBlackNode = Object.create(BinaryNode, {
  isRed: { value: true, writable: true },
}).init();
const nill = Object.create(RedBlackNode).init();
nill.isRed = false;
RedBlackNode.left = nill;
RedBlackNode.right = nill;

const RedBlackTree = {
  init: function init({ compareFunc }) {
    if (typeof compareFunc !== "function") {
      throw new Error(
        "When creating the RedBlackTree, you need to declare 'compareFunc' function"
      );
    }
    this._root = nill;
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
  has: function has(data) {
    let cursor = this._root;
    while (cursor !== nill) {
      if (cursor.data === data) {
        return true;
      }
      cursor = this._compareFunc(cursor.data, data)
        ? cursor.left
        : cursor.right;
    }
    return false;
  },
  print: function print() {
    if (this.isEmpty()) {
      return false;
    }
    const stack = Object.create(Stack).init();
    let cursor = this._root;
    const result = [];
    while (true) {
      for (; cursor !== nill; cursor = cursor.left) {
        stack.push(cursor);
      }
      if (!(cursor = stack.top().data)) {
        break;
      }
      stack.pop();
      result.push(cursor.data);
      cursor = cursor.right;
    }
    return result;
  },
  insert: function insert(data) {
    const newNode = Object.create(RedBlackNode);
    newNode.data = data;
    let cursor = this._root;
    let isLeft = null;
    let parent = null;
    while (cursor !== nill) {
      isLeft = this._compareFunc(cursor.data, data);
      parent = cursor;
      cursor = isLeft ? cursor.left : cursor.right;
    }
    ++this._size;
    if (parent === null) {
      this._root = newNode;
      newNode.isRed = false;
      return true;
    }
    this._link(parent, newNode, isLeft);
    return this._insertCheck(newNode);
  },
  _insertCheck: function _insertCheck(node) {
    if (node === this._root) {
      node.isRed = false;
      return true;
    }
    if (!node.parent.isRed) {
      return true;
    }
    const uncle = this._getUncle(node);
    if (uncle.isRed) {
      node.parent.isRed = false;
      uncle.isRed = false;
      uncle.parent.isRed = true;
      return this._insertCheck(uncle.parent);
    }
    const parent = node.parent;
    const grandParent = parent.parent;
    let graphState = 0;
    if (grandParent.left === parent) {
      graphState += 1;
    }
    if (parent.left === node) {
      graphState += 2;
    }
    let color;
    if (graphState === 0) {
      this._rotateLeft(grandParent);
      color = [true, false, true];
    } else if (graphState === 1) {
      this._rotateLeft(parent) && this._rotateRight(grandParent);
      color = [true, true, false];
    } else if (graphState === 2) {
      this._rotateRight(parent) && this._rotateLeft(grandParent);
      color = [true, true, false];
    } else if (graphState === 3) {
      this._rotateRight(grandParent);
      color = [true, false, true];
    }

    [grandParent, parent, node].forEach(
      (value, index) => (value.isRed = color[index])
    );
    return true;
  },
  _rotateRight: function _rotateRight(node) {
    const parent = node.parent;
    const origin = node;
    const x = node.left;
    this._link(node, x.right, true);
    this._link(x, node, false);
    if (parent === null) {
      x.parent = null;
      this._root = x;
      return true;
    }
    if (parent.left === origin) {
      this._link(parent, x, true);
    } else {
      this._link(parent, x, false);
    }
    return true;
  },
  _rotateLeft: function _rotateRight(node) {
    const parent = node.parent;
    const origin = node;
    const x = node.right;
    this._link(node, x.left, false);
    this._link(x, node, true);
    if (parent === null) {
      x.parent = null;
      this._root = x;
      return true;
    }
    if (parent.left === origin) {
      this._link(parent, x, true);
    } else {
      this._link(parent, x, false);
    }
    return true;
  },
  _link: function _link(parent, child, isLeft) {
    child.parent = parent;
    if (isLeft) {
      parent.left = child;
      return true;
    }
    parent.right = child;
    return true;
  },
  _getUncle: function _getUncle(node) {
    return node.parent.parent.left === node.parent
      ? node.parent.parent.right
      : node.parent.parent.left;
  },
  remove: function remove() {},
};

export default RedBlackTree;
