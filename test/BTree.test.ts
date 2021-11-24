import BTree from "@src/BTree";
import { expect } from "chai";
import { beforeEach, it } from "mocha";

describe("BTree", () => {
  let bt: BTree<number, number>;
  const insertData = [11, 1, 4, 6, 3, 10, 8, 5, 7, 2, 9];
  const sortedData = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
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
    insertData.forEach((v) => {
      bt.insert(v, v);
    });
    sortedData.forEach((v) => {
      expect(bt.getIndex(v)).to.equal(v);
    });
  });
  it("getIndex method return null when key is not matched key", () => {
    insertData.forEach((v) => {
      bt.insert(v, v);
    });
    expect(bt.getIndex(12)).to.equal(null);
  });
  it("insert method increase size", () => {
    expect(bt.size).to.equal(0);
    insertData.forEach((v) => {
      bt.insert(v, v);
    });
    expect(bt.size).to.equal(11);
  });
  it("insert method return true", () => {
    insertData.forEach((v) => {
      expect(bt.insert(v, v)).to.be.true;
    });
  });
  it("remove method decrease size", () => {
    insertData.forEach((v) => {
      bt.insert(v, v);
    });
    expect(bt.size).to.equal(11);
    bt.remove(7);
    expect(bt.size).to.equal(10);
  });
  it("remove method delete node", () => {
    insertData.forEach((v) => {
      bt.insert(v, v);
    });
    expect(bt.getIndex(11)).to.equal(11);
    bt.remove(11);
    expect(bt.getIndex(11)).to.equal(null);
  });
});
