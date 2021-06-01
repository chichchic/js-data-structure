const BinaryNode = {
  init: function init(source) {
    source = Object.assign(
      { parent: null, left: null, right: null, data: null },
      source
    );
    if (
      !this._canLinked(source.parent) ||
      !this._canLinked(source.left) ||
      !this._canLinked(source.right)
    ) {
      throw new Error("Other than BinaryNode, You cannot link");
    }
    this.parent = source.parent;
    this.left = source.left;
    this.right = source.right;
    this.data = source.data;
    return this;
  },
  _canLinked: function _canLinked(target) {
    if (target === null || BinaryNode.isPrototypeOf(target)) {
      return true;
    }
    return false;
  },
};

export default BinaryNode;
