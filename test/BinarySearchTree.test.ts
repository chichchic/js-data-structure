import BinarySearchTree from "@src/BinarySearchTree";
import { expect } from "chai";
import { it } from "mocha";

describe("BinarySearchTree", () => {
  let bst: BinarySearchTree<number>;
  beforeEach(() => {
    bst = new BinarySearchTree<number>((a: number | null, b: number | null) => {
      if (a === null) {
        return true;
      }
      if (b === null) {
        return false;
      }
      return a > b;
    });
    bst.insert(7);
    bst.insert(1);
    bst.insert(3);
    bst.insert(5);
    bst.insert(2);
    bst.insert(4);
    bst.insert(8);
    bst.insert(6);
    bst.insert(-1);
    bst.insert(-9);
  });
  it("sould insert increase size", () => {
    const beforeSize = bst.size;
    bst.insert(9);
    expect(bst.size - beforeSize).to.equal(1);
  });
  it("sould remove decrease size when have data", () => {
    const beforeSize = bst.size;
    bst.remove(1);
    expect(bst.size - beforeSize).to.equal(-1);
  });
  it("sould remove return true when have data", () => {
    expect(bst.remove(7)).to.be.true;
  });
  it("sould remove data when have data", () => {
    expect(bst.have(1)).to.be.true;
    expect(bst.remove(1)).to.be.true;
    expect(bst.have(1)).to.be.false;
  });
  it("sould remove return fale when does'nt have data", () => {
    expect(bst.remove(9)).to.be.false;
  });
  it("should have return true when have data", () => {
    expect(bst.have(1)).to.be.true;
  });
  it("should have return false when dosen't have data", () => {
    expect(bst.have(11)).to.be.false;
  });
});
