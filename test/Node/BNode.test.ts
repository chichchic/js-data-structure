import BLinkedNode from "@src/Node/BLinkedNode";
import BNode from "@src/Node/BNode";
import LinkedNode from "@src/Node/LinkedNode";
import { expect } from "chai";
import { beforeEach, it } from "mocha";

describe("BNode", () => {
  let bnode: BNode<number, number>;
  beforeEach(() => {
    bnode = new BNode<number, number>({ compareFunc: (a, b) => a < b });
  });
  it("should insert method increase size", () => {
    expect(bnode.size).to.equal(0);
    bnode.insert(1, 1);
    expect(bnode.size).to.equal(1);
  });
  it("should sorted after run insert method", () => {
    bnode.insert(2, 2);
    bnode.insert(1, 1);
    bnode.insert(3, 3);
    bnode.insert(0, 0);
    bnode.insert(4, 4);
    let cursor = bnode.getFirstLinkedNode();
    [0, 1, 2, 3, 4].forEach((v) => {
      expect(
        (cursor as LinkedNode<BLinkedNode<number, number>>).getData().data.index
      ).to.equal(v);
      cursor = (
        cursor as LinkedNode<BLinkedNode<number, number>>
      ).getNextNode();
    });
  });
  it("sould remove method decrease size", () => {
    bnode.insert(1, 1);
    expect(bnode.size).to.equal(1);
    bnode.remove(1);
    expect(bnode.size).to.equal(0);
  });
  it("should sorted after run insert method", () => {
    bnode.insert(2, 2);
    bnode.insert(1, 1);
    bnode.insert(3, 3);
    bnode.insert(0, 0);
    bnode.insert(4, 4);
    bnode.remove(2);
    let cursor = bnode.getFirstLinkedNode();
    [0, 1, 3, 4].forEach((v) => {
      expect(
        (cursor as LinkedNode<BLinkedNode<number, number>>).getData().data.index
      ).to.equal(v);
      cursor = (
        cursor as LinkedNode<BLinkedNode<number, number>>
      ).getNextNode();
    });
  });
});
