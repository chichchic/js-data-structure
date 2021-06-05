import BinaryNode from "./Node/BinaryNode.js";
import Stack from "./Stack.js";

const AVLNode = Object.create(BinaryNode, {
  balance: { value: 1, writable: true },
});
const nill = Object.create(AVLNode).init();
Object.defineProperty(nill, "balance", { value: 0 });
AVLNode.left = nill;
AVLNode.right = nill;

const AVLTree = {
  init: function init({ compareFunc }) {
    if (typeof compareFunc !== "function") {
      throw new Error(
        "When creating the AVLTree, you need to declare 'compareFunc' function"
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
    const newNode = Object.create(AVLNode);
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
      this._root.parent = null;
      return true;
    }
    this._link(parent, newNode, isLeft);
    let balanceCursor = newNode;
    while (balanceCursor !== null) {
      const leftBalace = balanceCursor.left.balance;
      const rightBalace = balanceCursor.right.balance;
      if (Math.abs(leftBalace - rightBalace) < 2) {
        this._setBalance(balanceCursor);
      } else {
        this._insertBalanceCheck(balanceCursor);
      }
      balanceCursor = balanceCursor.parent;
    }
    return true;
  },
  remove: function remove(node) {
    if (!this._hasNode(node)) {
      return false;
    }
    let deletedNode, targetNode;
    --this._size;
    if (node.left === nill && node.right === nill) {
      deletedNode = node;
    } else if (node.left === nill) {
      deletedNode = this._findSmallestChild(node.right);
    } else {
      deletedNode = this._findBiggestChild(node.left);
    }

    if (deletedNode.left === nill) {
      targetNode = deletedNode.right;
    } else {
      targetNode = deletedNode.left;
    }

    if (deletedNode === this._root) {
      this._root = nill;
      return true;
    }
    const parent = deletedNode.parent;
    const isLeft = parent.left === deletedNode ? true : false;
    this._link(parent, targetNode, isLeft);

    node.data = deletedNode.data;
    let balanceCursor = parent;
    while (balanceCursor !== null) {
      const leftBalace = balanceCursor.left.balance;
      const rightBalace = balanceCursor.right.balance;
      if (Math.abs(leftBalace - rightBalace) < 2) {
        this._setBalance(balanceCursor);
      } else {
        this._insertBalanceCheck(balanceCursor);
      }
      balanceCursor = balanceCursor.parent;
    }
    return true;
  },
  _insertBalanceCheck(node) {
    const childDirection =
      node.left.balance > node.right.balance ? "left" : "right";
    const grandChildDirection =
      node[childDirection].left.balance > node[childDirection].right.balance
        ? "left"
        : "right";
    if (childDirection === "left" && grandChildDirection === "left") {
      return this._rotateRight(node);
    } else if (childDirection === "right" && grandChildDirection === "right") {
      return this._rotateLeft(node);
    } else if (childDirection === "left" && grandChildDirection === "right") {
      this._rotateLeft(node[childDirection]);
      return this._rotateRight(node);
    } else {
      this._rotateRight(node[childDirection]);
      return this._rotateLeft(node);
    }
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
  _setBalance: function _setBalance(node) {
    const leftBalance = node.left.balance;
    const rightBalance = node.right.balance;
    node.balance = Math.max(leftBalance, rightBalance) + 1;
    return true;
  },
  _rotateRight: function _rotateRight(node) {
    const parent = node.parent;
    const origin = node;
    const x = node.left;
    this._link(node, x.right, true);
    this._link(x, node, false);
    this._setBalance(node);
    this._setBalance(x);
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
    this._setBalance(node);
    this._setBalance(x);
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

export default AVLTree;
