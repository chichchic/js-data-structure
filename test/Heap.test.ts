import Heap from "@src/Heap";
import { expect } from "chai";
import { beforeEach, it } from "mocha";

describe("Heap util method", () => {
  let heap: Heap<number>;
  beforeEach(() => {
    const compareFunc = (a: number, b: number) => a < b;
    heap = new Heap<number>(compareFunc);
  });
  it("sould push increase Heap size", () => {
    expect(heap.size).to.equal(0);
    heap.push(0);
    expect(heap.size).to.equal(1);
  });
  it("sould pop decrease Heap size", () => {
    heap.push(0);
    expect(heap.size).to.equal(1);
    heap.pop();
    expect(heap.size).to.equal(0);
  });
  it("sould top throw ReferenceError when Heap is Empty", () => {
    expect(heap.top.bind(heap)).throw(ReferenceError);
  });
  it("should Heap make sorted data when all data pop", () => {
    const answer = [0, 1, 2, 3, 4, 5];
    let index = 0;
    heap.push(0);
    heap.push(3);
    heap.push(2);
    heap.push(4);
    heap.push(5);
    heap.push(1);
    while (!heap.isEmpty()) {
      expect(heap.top()).to.equal(answer[index++]);
      heap.pop();
    }
  });
});
