"use strict";

import BinaryNode from "./Node/BinaryNode.js";
import Stack from "./Stack.js";

const RedBlackNode = Object.create(BinaryNode, {
  isRed: { value: true, writable: true },
}).init();
const nill = Object.create(RedBlackNode).init();
Object.defineProperty(nill, "isRed", { value: false });
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
  remove: function remove(node) {
    if (!this._hasNode(node)) {
      return false;
    }
    //참고 링크 : https://ict-nroo.tistory.com/73
    this._size--;
    let deletedNode, targetNode;
    if (node.left === nill && node.right === nill) {
      deletedNode = node;
    } else if (node.right === nill) {
      deletedNode = this._findBiggestChild(node.left);
    } else if (node.left === nill) {
      deletedNode = this._findSmallestChild(node.right);
    } else {
      const leftCandidate = this._findBiggestChild(node.left);
      if (leftCandidate.isRed) {
        deletedNode = leftCandidate;
      }
      const rightCandidate = this._findSmallestChild(node.right);
      if (rightCandidate.isRed) {
        deletedNode = rightCandidate;
      }
      if (deletedNode === undefined) {
        deletedNode = rightCandidate;
      }
    }
    if (deletedNode.left !== nill) {
      targetNode = deletedNode.left;
    } else {
      targetNode = deletedNode.right;
    }
    if (deletedNode === this._root) {
      this._root = targetNode;
      targetNode.parent === null;
    } else {
      const deletedNodeparent = deletedNode.parent;
      targetNode.parent = deletedNodeparent;
      const deletedNodeDirection =
        deletedNodeparent.left === deletedNode ? "left" : "right";
      deletedNodeparent[deletedNodeDirection] = targetNode;
    }
    node.data = deletedNode.data;
    if (deletedNode.isRed === true) {
      return true;
    }
    if (targetNode === nill) {
      return true;
    }
    return this._fixupDelete(targetNode);
  },
  _fixupDelete: function _fixupDelete(node) {
    while (true) {
      if (node === this._root) {
        node.isRed = false;
        return true;
      }
      const parent = node.parent;
      const isLeftChild = parent.left === node ? true : false;
      const sibling = isLeftChild ? parent.right : parent.left;
      //case: 1
      if (sibling.isRed) {
        parent.isRed = true;
        sibling.isRed = false;
        if (isLeftChild) {
          this._rotateLeft(parent);
        } else {
          this._rotateRight(parent);
        }
        continue;
      }
      //case: 3
      if (isLeftChild && sibling.left.isRed) {
        sibling.isRed = true;
        sibling.left.isRed = false;
        this._rotateRight(sibling);
        continue;
      }
      //case: 7
      if (!isLeftChild && sibling.right.isRed) {
        sibling.isRed = true;
        sibling.right.isRed = false;
        this._rotateLeft(sibling);
        continue;
      }
      //case: 4
      if (isLeftChild && sibling.right.isRed) {
        sibling.isRed = parent.isRed;
        parent.isRed = false;
        sibling.right.isRed = false;
        this._rotateLeft(parent);
        return true;
      }
      //case: 8
      if (!isLeftChild && sibling.left.isRed) {
        sibling.isRed = parent.isRed;
        parent.isRed = false;
        sibling.left.isRed = false;
        this._rotateRight(parent);
        return true;
      }
      //case: 2, 5
      sibling.isRed = true;
      if (!parent.isRed) {
        node = parent;
        continue;
      }
      parent.isRed = false;
      return true;
    }
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

export default RedBlackTree;
