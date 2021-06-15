import BNode from "./BNode.js";

const BplusNode = Object.create(BNode, {
  next: {
    value: null,
    writable: true,
  },
  prev: {
    value: null,
    writable: true,
  },
});

export default BplusNode;
