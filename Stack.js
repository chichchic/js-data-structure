import LinkedNode from "./LinkedNode.js";

const Stack = {
  init: function init() {
    this._cursor = Object.create(LinkedNode).init();
    this._size = 0;
    return Object.seal(this);
  },
  isEmpty: function isEmpty() {
    return this._size === 0;
  },
  size: function size() {
    return this._size;
  },
  top: function top() {
    if (this.isEmpty()) {
      return false;
    }
    return this._cursor.next;
  },
  push: function push(data) {
    const newNode = Object.create(LinkedNode).init({
      next: this._cursor.next,
      data,
    });
    this._cursor.next = newNode;
    this._size++;
    return true;
  },
  pop: function pop() {
    if (this.isEmpty()) {
      return false;
    }
    this._cursor.next = this._cursor.next.next;
    this._size--;
    return true;
  },
};

export default Stack;
