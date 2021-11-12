import BTree from "@src/BTree";
import { expect } from "chai";
import { beforeEach, it } from "mocha";

describe("BTree", () => {
  let bt: BTree<number, number>;
  beforeEach(() => {
    bt = new BTree<number, number>((a, b) => a < b);
  });
  it("isEmpty method return true when BTree is empty", () => {
    expect(bt.isEmpty()).to.be.true;
  });
  it("isEmpty return true when BTree isn't empty", () => {
    bt.insert(1, 1);
    expect(bt.isEmpty()).to.be.false;
  });
  it("getIndex method return index when key is matched", () => {
    bt.insert(11, 11);
    bt.insert(1, 1);
    bt.insert(4, 4);
    bt.insert(6, 6);
    bt.insert(3, 3);
    bt.insert(10, 10);
    bt.insert(8, 8);
    bt.insert(5, 5);
    bt.insert(7, 7);
    bt.insert(2, 2);
    bt.insert(9, 9);
    expect(bt.getIndex(6)).to.equal(6);
  });
  it("getIndex method return null when key is not matched key", () => {
    bt.insert(11, 11);
    bt.insert(1, 1);
    bt.insert(4, 4);
    bt.insert(6, 6);
    bt.insert(3, 3);
    bt.insert(10, 10);
    bt.insert(8, 8);
    bt.insert(5, 5);
    bt.insert(7, 7);
    bt.insert(2, 2);
    bt.insert(9, 9);
    expect(bt.getIndex(12)).to.equal(null);
  });
  it("insert method increase size", () => {
    expect(bt.size).to.equal(0);
    bt.insert(11, 11);
    bt.insert(1, 1);
    bt.insert(4, 4);
    bt.insert(6, 6);
    bt.insert(3, 3);
    bt.insert(10, 10);
    bt.insert(8, 8);
    bt.insert(5, 5);
    bt.insert(7, 7);
    bt.insert(2, 2);
    bt.insert(9, 9);
    expect(bt.size).to.equal(11);
  });
  it("remove method decrease size", () => {
    bt.insert(11, 11);
    bt.insert(1, 1);
    bt.insert(4, 4);
    bt.insert(6, 6);
    bt.insert(3, 3);
    bt.insert(10, 10);
    bt.insert(8, 8);
    bt.insert(5, 5);
    bt.insert(7, 7);
    bt.insert(2, 2);
    bt.insert(9, 9);
    expect(bt.size).to.equal(11);
    bt.remove(7);
    expect(bt.size).to.equal(10);
  });
  it("remove method delete node", () => {
    bt.insert(11, 11);
    bt.insert(1, 1);
    bt.insert(4, 4);
    bt.insert(6, 6);
    bt.insert(3, 3);
    bt.insert(10, 10);
    bt.insert(8, 8);
    bt.insert(5, 5);
    bt.insert(7, 7);
    bt.insert(2, 2);
    bt.insert(9, 9);
    expect(bt.getIndex(11)).to.equal(11);
    bt.remove(11);
    expect(bt.getIndex(11)).to.equal(null);
  });
});
