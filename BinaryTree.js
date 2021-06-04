import BinaryNode from "./Node/BinaryNode.js";
import Stack from "./Stack.js";

const nill = Object.create(BinaryNode).init();
const DefaultNode = Object.create(BinaryNode).init({ left: nill, right: nill });

const BinaryTree = {
  _root: nill,
  init: function init({ compareFunc }) {
    if (typeof compareFunc !== "function") {
      throw new Error(
        "When creating the BinaryTree, you need to declare 'compareFunc' function"
      );
    }
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
    return !!this.find(data);
  },
  _hasNode: function _hasNode(node) {
    let cursor = this._root;
    while (cursor !== nill) {
      if (cursor === node) {
        return true;
      }
      cursor = this._compareFunc(cursor.data, node.data)
        ? cursor.left
        : cursor.right;
    }
    return false;
  },
  find: function find(data) {
    let cursor = this._root;
    while (cursor !== nill) {
      if (cursor.data === data) {
        return cursor;
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
    const newNode = Object.create(DefaultNode);
    newNode.data = data;
    let cursor = this._root;
    let parent = null;
    let isLeft = null;
    while (cursor !== nill) {
      isLeft = this._compareFunc(cursor.data, data);
      parent = cursor;
      cursor = isLeft ? cursor.left : cursor.right;
    }
    ++this._size;
    if (parent === null) {
      this._root = newNode;
      return true;
    }
    return this._link(parent, newNode, isLeft);
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
  remove: function remove(node) {
    if (!this._hasNode(node)) {
      return false;
    }
    let deletedNode, targetNode;
    if (node.left === nill && node.right === nill) {
      deletedNode = node;
    } else if (node.right === nill) {
      deletedNode = this._findBiggestChild(node.left);
    } else {
      deletedNode = this._findSmallestChild(node.right);
    }
    if (deletedNode.left !== nill) {
      targetNode = deletedNode.left;
    } else {
      targetNode = deletedNode.right;
    }
    if (deletedNode === this._root) {
      this._root = targetNode;
      targetNode.parent = null;
    } else {
      const deletedNodeparent = deletedNode.parent;
      targetNode.parent = deletedNodeparent;
      const deletedNodeDirection =
        deletedNodeparent.left === deletedNode ? "left" : "right";
      deletedNodeparent[deletedNodeDirection] = targetNode;
      node.data = deletedNode.data;
    }
    this._size--;
    return true;
  },
  _findBiggestChild: function _findBiggestChild(node) {
    let cursor = node;
    while (cursor.right !== nill) {
      cursor = cursor.right;
    }
    return cursor;
  },
  _findSmallestChild: function _findSmallestChild(node) {
    let cursor = node;
    while (cursor.left !== nill) {
      cursor = cursor.left;
    }
    return cursor;
  },
};

export default BinaryTree;
