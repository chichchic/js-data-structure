import LinkedNode from "./LinkedNode.js";

const ttfNode = {
  init: function init(source) {
    if (typeof source.compareFunc !== "function") {
      throw new Error(
        "When creating the 2-3-4 Node, you need to declare 'compareFunc' function"
      );
    }
    source = Object.assign({ parent: null, isLeaf: false }, source);
    this.compareFunc = source.compareFunc;
    this.isLeaf = source.isLeaf;
    this.parent = source.parent;
    this.keys = [];
    return this;
  },
  insert: function insert(data) {
    const newNode = Object.create(LinkedNode).init({ data });
    const spliceIndex = this.keys.findIndex((val) =>
      this.compareFunc(data, val.data)
    );
    if (spliceIndex < 0) {
      this.keys.push(newNode);
      return this.size - 1;
    }
    this.keys.splice(spliceIndex, 0, newNode);
    return spliceIndex;
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
