import { it } from "mocha";
import Queue from "@src/Queue";
import { expect } from "chai";

describe("Queue util methods", () => {
  let queue: Queue<number>;
  beforeEach(() => {
    queue = new Queue<number>();
  });
  it("should push increase size", () => {
    expect(queue.getSize()).to.equal(0);
    queue.push(0);
    expect(queue.getSize()).to.equal(1);
  });
  it("should isEmpty return true when Queue is empty", () => {
    expect(queue.isEmpty()).to.be.true;
  });
  it("should isEmpty return false when Queue isn't empty", () => {
    queue.push(1);
    expect(queue.isEmpty()).to.be.false;
  });
  it("should has return true when Queue has target value", () => {
    queue.push(0);
    queue.push(1);
    queue.push(2);
    queue.push(3);
    expect(queue.has(1)).to.be.true;
  });
  it("should has return true when Queue doesn't have target value", () => {
    expect(queue.has(1)).to.be.false;
  });
  it("should push increase size", () => {
    expect(queue.getSize()).to.equal(0);
    queue.push(1);
    expect(queue.getSize()).to.equal(1);
  });
  it("should pop decrease size", () => {
    queue.push(1);
    expect(queue.getSize()).to.equal(1);
    queue.pop();
    expect(queue.getSize()).to.equal(0);
  });
  it("should queue is follow the FIFO rule", () => {
    const targetValues = [1, 2, 3, 4];
    targetValues.forEach((v) => queue.push(v));
    targetValues.forEach((v) => {
      expect(queue.back().getData()).to.equal(v);
      queue.pop();
    });
  });
});
