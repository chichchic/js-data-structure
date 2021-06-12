import LinkedNode from "./LinkedNode.js";

const BNode = {
  init: function init(source) {
    if (typeof source.compareFunc !== "function") {
      throw new Error(
        "When creating the B Node, you need to declare 'compareFunc' function"
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
    const spliceIndex = 0;
    for(; spliceIndex < this.size; ++spliceIndex) {
      if(this.compareFunc(data, this.keys[spliceIndex].data))
    }
    this.keys.splice(spliceIndex, 0, newNode);

    if(spliceIndex > 0) {
      newNode.prev = this.keys[spliceIndex - 1].next;
    }
    if(spliceIndex < this.size - 1) {
      newNode.next = this.keys[spliceIndex + 1].prev;
    }
  },
};

Object.defineProperty(BNode, "size", {
  get: function () {
    return this.keys.length;
  },
});

export default BNode;
