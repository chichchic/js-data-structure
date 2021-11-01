import { it } from "mocha";
import Stack from "@src/Stack";
import { expect } from "chai";

describe("Stack util method", () => {
  it("should push method increasing size", () => {
    const st = new Stack<number>();
    expect(st.getSize()).to.equal(0);
    st.push(1);
    expect(st.getSize()).to.equal(1);
  });
  it("should pop method decreasing size", () => {
    const st = new Stack<number>();
    st.push(1);
    expect(st.getSize()).to.equal(1);
    st.pop();
    expect(st.getSize()).to.equal(0);
  });
  it("should top method's return value is last push value", () => {
    const st = new Stack<number>();
    st.push(1);
    st.push(2);
    st.push(3);
    expect(st.top()).to.equal(3);
  });
  it("should push and pop method change top method return value", () => {
    const st = new Stack<number>();
    st.push(1);
    st.push(2);
    st.push(3);
    expect(st.top()).to.equal(3);
    st.pop();
    expect(st.top()).to.equal(2);
    st.pop();
    expect(st.top()).to.equal(1);
  });
  it("should isEmpty method check Stack is empty", () => {
    const st = new Stack<number>();
    expect(st.isEmpty()).to.equal(true);
    st.push(1);
    expect(st.isEmpty()).to.equal(false);
  });
});
