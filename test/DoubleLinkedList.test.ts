import { it } from "mocha";
import DoubleLinkedList from "@src/DoubleLinkedList";
import { expect } from "chai";
import LinkedNode from "@src/Node/LinkedNode";

//FIXME: 반복되는 코드 밖으로 빼서 중복 줄여주기
describe("DoubleLinkedList util methods", () => {
  describe("isEmpty method", () => {
    it("should isEmpty return true when DoubleLinkedList is empty", () => {
      const dll = new DoubleLinkedList<number>();
      expect(dll.isEmpty()).to.be.true;
    });
    it("should isEmpty return false when DoubleLinkedList isn't empty", () => {
      const dll = new DoubleLinkedList<number>();
      dll.pushBack(1);
      expect(dll.isEmpty()).to.be.false;
    });
  });

  describe("pushNext method", () => {
    it("should pushNext increase size", () => {
      const dll = new DoubleLinkedList<number>();
      dll.pushFront(0);
      expect(dll.size).to.equal(1);
      const front = dll.front();
      dll.pushNext(front, 2);
      expect(dll.size).to.equal(2);
    });
    it("should pushNext insert next of target", () => {
      const dll = new DoubleLinkedList<number>();
      dll.pushFront(0);
      dll.pushFront(1);
      const front = dll.front();
      dll.pushNext(front, 2);
      const cursor = dll.front();
      expect(cursor.getData()).to.equal(1);
      expect((<LinkedNode<number>>cursor.getNext()).getData()).to.equal(2);
      expect(
        (<LinkedNode<number>>cursor.getNext()?.getNext()).getData()
      ).to.equal(0);
    });
  });
  describe("pushPrev method", () => {
    it("should pushPrev increase size", () => {
      const dll = new DoubleLinkedList<number>();
      dll.pushBack(0);
      expect(dll.size).to.equal(1);
      const back = dll.back();
      dll.pushPrev(back, 2);
      expect(dll.size).to.equal(2);
    });
    it("should pushPrev insert prev of target", () => {
      const dll = new DoubleLinkedList<number>();
      dll.pushBack(0);
      dll.pushBack(1);
      const back = dll.back();
      dll.pushPrev(back, 2);
      const cursor = dll.back();
      expect(cursor.getData()).to.equal(1);
      expect((<LinkedNode<number>>cursor.getPrev()).getData()).to.equal(2);
      expect(
        (<LinkedNode<number>>cursor.getPrev()?.getPrev()).getData()
      ).to.equal(0);
    });
  });
  describe("pushFront method", () => {
    it("should pushFront increase size", () => {
      const dll = new DoubleLinkedList<number>();
      expect(dll.size).to.equal(0);
      dll.pushFront(0);
      expect(dll.size).to.equal(1);
    });
    it("should pushFront insert front of DoubleLinkedList", () => {
      const dll = new DoubleLinkedList<number>();
      dll.pushFront(0);
      expect(dll.front().getData()).to.equal(0);
    });
  });
  describe("pushBack method", () => {
    it("should pushBack increase size", () => {
      const dll = new DoubleLinkedList<number>();
      expect(dll.size).to.equal(0);
      dll.pushBack(0);
      expect(dll.size).to.equal(1);
    });
    it("should pushBack insert front of DoubleLinkedList", () => {
      const dll = new DoubleLinkedList<number>();
      dll.pushBack(0);
      expect(dll.back().getData()).to.equal(0);
    });
  });
  describe("front method and back method", () => {
    it("should front throw ReferenceError when DoubleLinkedList is empty", () => {
      const dll = new DoubleLinkedList<number>();
      expect(dll.front.bind(dll)).to.throw(ReferenceError);
    });
    it("should back throw ReferenceError when DoubleLinkedList is empty", () => {
      const dll = new DoubleLinkedList<number>();
      expect(dll.back.bind(dll)).to.throw(ReferenceError);
    });
  });
  describe("has method", () => {
    it("should has method return true when DoubleLinkedList has same value", () => {
      const dll = new DoubleLinkedList<number>();
      dll.pushBack(0);
      dll.pushBack(1);
      dll.pushBack(2);
      dll.pushBack(3);
      expect(dll.has(2)).to.be.true;
    });
    it("should has method return false when DoubleLinkedList doesn't have same value", () => {
      const dll = new DoubleLinkedList<number>();
      expect(dll.has(2)).to.be.false;
    });
  });
  describe("erase method", () => {
    it("should erase decrease size", () => {
      const dll = new DoubleLinkedList<number>();
      dll.pushBack(0);
      expect(dll.size).to.equal(1);
      const back = dll.back();
      dll.erase(back);
      expect(dll.size).to.equal(0);
    });
    it("should erase link prev node with next node", () => {
      const dll = new DoubleLinkedList<number>();
      dll.pushBack(0);
      dll.pushBack(1);
      const back = dll.back();
      dll.pushBack(2);
      dll.erase(back);
      expect((<LinkedNode<number>>dll.back().getPrev()).getData()).to.equal(0);
      expect((<LinkedNode<number>>dll.front().getNext()).getData()).to.equal(2);
    });
    it("should erase return true when erase target", () => {
      const dll = new DoubleLinkedList<number>();
      dll.pushBack(0);
      const back = dll.back();
      expect(dll.erase(back)).to.be.true;
    });
    it("should erase return false when DoubleLinkeList dosen't have target", () => {
      const dll1 = new DoubleLinkedList<number>();
      const dll2 = new DoubleLinkedList<number>();
      dll1.pushBack(0);
      const back = dll1.back();
      expect(dll2.erase(back)).to.be.false;
    });
  });
  describe("popBack method", () => {
    it("should popBack decrease size", () => {
      const dll = new DoubleLinkedList<number>();
      dll.pushBack(0);
      expect(dll.size).to.equal(1);
      dll.popBack();
      expect(dll.size).to.equal(0);
    });
    it("should popBack erase back node", () => {
      const dll = new DoubleLinkedList<number>();
      dll.pushBack(0);
      dll.pushBack(1);
      expect((<LinkedNode<number>>dll.back()).getData()).to.equal(1);
      dll.popBack();
      expect((<LinkedNode<number>>dll.back()).getData()).to.equal(0);
    });
    it("should popBack thorw ReferenceError when DoubleLinkeList is Empty", () => {
      const dll = new DoubleLinkedList<number>();
      expect(dll.popBack.bind(dll)).to.throw(ReferenceError);
    });
  });
  describe("popFront method", () => {
    it("should popFront decrease size", () => {
      const dll = new DoubleLinkedList<number>();
      dll.pushFront(0);
      expect(dll.size).to.equal(1);
      dll.popFront();
      expect(dll.size).to.equal(0);
    });
    it("should popFront erase back node", () => {
      const dll = new DoubleLinkedList<number>();
      dll.pushFront(0);
      dll.pushFront(1);
      expect((<LinkedNode<number>>dll.front()).getData()).to.equal(1);
      dll.popFront();
      expect((<LinkedNode<number>>dll.front()).getData()).to.equal(0);
    });
    it("should popFront thorw ReferenceError when DoubleLinkeList is Empty", () => {
      const dll = new DoubleLinkedList<number>();
      expect(dll.popFront.bind(dll)).to.throw(ReferenceError);
    });
  });
});
