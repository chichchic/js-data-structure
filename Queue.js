import DoublyLinkedList from "./DoublyLinkedList.js";
const Queue = Object.create(DoublyLinkedList, {
  push: {
    value: function push(data) {
      return this.pushBack(data);
    },
  },
  pop: {
    value: function pop() {
      return this.popFront();
    },
  },
});

export default Object.freeze(Queue);
