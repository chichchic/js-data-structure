import LinkedNode from "./LinkedNode.js";

const DoublyLinkedList = {
  init: function init() {
    this._head = Object.create(LinkedNode).init();
    this._tail = Object.create(LinkedNode).init({ prev: this._head });
    this._head.next = this._tail;
    return Object.seal(this);
  },
  isEmpty: function isEmpty() {
    if (this._head.next === this._tail) {
      return true;
    }
    return false;
  },
  has: function has(target) {
    let cursor = this._head.next;
    while (cursor != this._tail) {
      if (cursor === target || cursor.data === target) {
        return true;
      }
      cursor = cursor.next;
    }
    return false;
  },
  front: function front() {
    if (this.isEmpty()) {
      return false;
    }
    return this._head.next;
  },
  back: function back() {
    if (this.isEmpty()) {
      return false;
    }
    return this._tail.prev;
  },
  pushPrev: function push(target, data) {
    if (!LinkedNode.isPrototypeOf(target) || !this.has(target)) {
      return false;
    }
    const newNode = Object.create(LinkedNode).init({
      prev: target.prev,
      next: target,
      data,
    });
    newNode.prev.next = newNode;
    newNode.next.prev = newNode;
    return true;
  },
  pushNext: function push(target, data) {
    if (!LinkedNode.isPrototypeOf(target) || !this.has(target)) {
      return false;
    }
    const newNode = Object.create(LinkedNode).init({
      prev: target,
      next: target.next,
      data,
    });
    newNode.next.prev = newNode;
    newNode.prev.next = newNode;
    return true;
  },
  pushFront: function pushFront(data) {
    if (this.isEmpty()) {
      return this._pushFirstNode(data);
    }
    return this.pushPrev(this._head.next, data);
  },
  pushBack: function pushBack(data) {
    if (this.isEmpty()) {
      return this._pushFirstNode(data);
    }
    return this.pushNext(this._tail.prev, data);
  },
  erase: function pop(target) {
    if (!LinkedNode.isPrototypeOf(target) || !this.has(target)) {
      return false;
    }
    target.prev.next = target.next;
    target.next.prev = target.prev;
    return true;
  },
  popFront: function popFront() {
    if (this.isEmpty()) {
      return false;
    }
    return this.erase(this._head.next);
  },
  popBack: function popBack() {
    if (this.isEmpty()) {
      return false;
    }
    return this.erase(this._tail.prev);
  },
  _pushFirstNode: function _pushFirstNode(data) {
    const newNode = Object.create(LinkedNode).init({
      prev: this._head,
      next: this._tail,
      data,
    });
    this._head.next = newNode;
    this._tail.prev = newNode;
    return true;
  },
};

export default DoublyLinkedList;
