const LinkedNode = {
  init: function init(source) {
    source = Object.assign({ prev: null, next: null, data: null }, source);
    if (!this._canLinked(source.prev) || !this._canLinked(source.next)) {
      throw new Error("Other than LinkedNode, You cannot link");
    }
    this.prev = source.prev;
    this.next = source.next;
    this.data = source.data;
    return Object.seal(this);
  },
  _canLinked: function _canLinked(target) {
    if (target === null || LinkedNode.isPrototypeOf(target)) {
      return true;
    }
    return false;
  },
};

export default LinkedNode;
