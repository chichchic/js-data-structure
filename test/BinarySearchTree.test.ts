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
      return a < b;
    });
    bst.insert(1);
    bst.insert(3);
    bst.insert(5);
    bst.insert(7);
  });
  it("sould insert increase size", () => {
    expect(bst.size).to.equal(4);
    bst.insert(9);
    expect(bst.size).to.equal(5);
  });
  it("sould remove decrease size when has data", () => {
    expect(bst.size).to.equal(4);
    bst.remove(1);
    expect(bst.size).to.equal(3);
  });
  it("sould remove return true when has data", () => {
    expect(bst.remove(7)).to.be.true;
  });
  it("sould remove return fale when does'nt have data", () => {
    expect(bst.remove(9)).to.be.false;
  });
  it("should have return true when has data", () => {
    expect(bst.have(1)).to.be.true;
  });
  it("should have return true when dosen't have data", () => {
    expect(bst.have(11)).to.be.false;
  });
});
