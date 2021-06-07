import LinkedNode from "./LinkedNode.js";

const ttfNode = {
  init: function init(source) {
    source = Object.assign({ parent: null, isLeaf: false }, source);
    this.isLeaf = source.isLeaf;
    this.keys = [];
    this.children = [null, null, null, null];
    return this;
  },
  insert: function insert(data) {
    const newNode = Object.create(LinkedNode).init({ data });
    this.keys.push(newNode);
  },
  _canLinked: function _canLinked(target) {
    if (target === null || ttfNode.isPrototypeOf(target)) {
      return true;
    }
    return false;
  },
};

Object.defineProperty(ttfNode, "size", {
  get: function () {
    return this.keys.length;
  },
});

export default ttfNode;
