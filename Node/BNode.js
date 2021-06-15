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
    let sliceIndex = 0;
    for (; sliceIndex < this.size; ++sliceIndex) {
      if (this.compareFunc(data, this.keys[sliceIndex].data)) {
        break;
      }
    }
    this.keys.splice(sliceIndex, 0, newNode);

    if (sliceIndex > 0) {
      newNode.prev = this.keys[sliceIndex - 1].next;
    }
    if (sliceIndex < this.size - 1) {
      newNode.next = this.keys[sliceIndex + 1].prev;
    }
    return sliceIndex;
  },
  findKey: function findKey(data) {
    let keyIndex = 0;
    for (; keyIndex < this.size; ++keyIndex) {
      if (this.compareFunc(data, this.keys[keyIndex].data)) {
        return { keyIndex, childNode: this.keys[keyIndex].prev };
      }
    }
    keyIndex--;
    return { keyIndex, childNode: this.keys[keyIndex].next };
  },
};

Object.defineProperty(BNode, "size", {
  get: function () {
    return this.keys.length;
  },
});

export default BNode;
