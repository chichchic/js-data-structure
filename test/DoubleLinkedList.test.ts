import { it } from "mocha";
import DoubleLinkedList from "@src/DoubleLinkedList";
import { expect } from "chai";
import LinkedNode from "@src/Node/LinkedNode";

//FIXME: 반복되는 코드 밖으로 빼서 중복 줄여주기
describe("DoubleLinkedList util methods", () => {
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
  it("should pushNext increase size", () => {
    const dll = new DoubleLinkedList<number>();
    dll.pushFront(0);
    expect(dll.getSize()).to.equal(1);
    const front = dll.front();
    dll.pushNext(front, 2);
    expect(dll.getSize()).to.equal(2);
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
  it("should pushPrev increase size", () => {
    const dll = new DoubleLinkedList<number>();
    dll.pushBack(0);
    expect(dll.getSize()).to.equal(1);
    const back = dll.back();
    dll.pushPrev(back, 2);
    expect(dll.getSize()).to.equal(2);
  });
  it("should pushFront increase size", () => {
    const dll = new DoubleLinkedList<number>();
    expect(dll.getSize()).to.equal(0);
    dll.pushFront(0);
    expect(dll.getSize()).to.equal(1);
  });
  it("should pushFront insert front of DoubleLinkedList", () => {
    const dll = new DoubleLinkedList<number>();
    dll.pushFront(0);
    expect(dll.front().getData()).to.equal(0);
  });
  it("should pushBack increase size", () => {
    const dll = new DoubleLinkedList<number>();
    expect(dll.getSize()).to.equal(0);
    dll.pushBack(0);
    expect(dll.getSize()).to.equal(1);
  });
  it("should pushBack insert front of DoubleLinkedList", () => {
    const dll = new DoubleLinkedList<number>();
    dll.pushBack(0);
    expect(dll.back().getData()).to.equal(0);
  });
  it("should front throw ReferenceError when DoubleLinkedList is empty", () => {
    const dll = new DoubleLinkedList<number>();
    expect(dll.front.bind(dll)).to.throw(ReferenceError);
  });
  it("should back throw ReferenceError when DoubleLinkedList is empty", () => {
    const dll = new DoubleLinkedList<number>();
    expect(dll.back.bind(dll)).to.throw(ReferenceError);
  });
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
  it("should erase decrease size", () => {
    const dll = new DoubleLinkedList<number>();
    dll.pushBack(0);
    expect(dll.getSize()).to.equal(1);
    const back = dll.back();
    dll.erase(back);
    expect(dll.getSize()).to.equal(0);
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
  it("should popBack decrease size", () => {
    const dll = new DoubleLinkedList<number>();
    dll.pushBack(0);
    expect(dll.getSize()).to.equal(1);
    dll.popBack();
    expect(dll.getSize()).to.equal(0);
  });
  it("should popBack erase back node", () => {
    const dll = new DoubleLinkedList<number>();
    dll.pushBack(0);
    dll.pushBack(1);
    expect((<LinkedNode<number>>dll.back()).getData()).to.equal(1);
    dll.popBack();
    expect((<LinkedNode<number>>dll.back()).getData()).to.equal(0);
  });
  it("should popBack return true when erase target", () => {
    const dll = new DoubleLinkedList<number>();
    dll.pushBack(0);
    expect(dll.popBack()).to.be.true;
  });
  it("should popBack return false when DoubleLinkeList dosen't have target", () => {
    const dll1 = new DoubleLinkedList<number>();
    const dll2 = new DoubleLinkedList<number>();
    dll1.pushBack(0);
    expect(dll2.popBack()).to.be.false;
  });
  it("should popFront decrease size", () => {
    const dll = new DoubleLinkedList<number>();
    dll.pushFront(0);
    expect(dll.getSize()).to.equal(1);
    dll.popFront();
    expect(dll.getSize()).to.equal(0);
  });
  it("should popFront erase back node", () => {
    const dll = new DoubleLinkedList<number>();
    dll.pushFront(0);
    dll.pushFront(1);
    expect((<LinkedNode<number>>dll.front()).getData()).to.equal(1);
    dll.popFront();
    expect((<LinkedNode<number>>dll.front()).getData()).to.equal(0);
  });
  it("should popFront return true when erase target", () => {
    const dll = new DoubleLinkedList<number>();
    dll.pushFront(0);
    expect(dll.popFront()).to.be.true;
  });
  it("should popFront return false when DoubleLinkeList dosen't have target", () => {
    const dll1 = new DoubleLinkedList<number>();
    const dll2 = new DoubleLinkedList<number>();
    dll1.pushFront(0);
    expect(dll2.popFront()).to.be.false;
  });
});
