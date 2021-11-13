declare module "Global" {
  export type compareFuncType<T> = (a: T, b: T) => boolean;
  export type pointer<T> = T | null;
  export interface node<T> {
    parent?: pointer<BinaryNode<T>>;
    left?: pointer<BinaryNode<T>>;
    right?: pointer<BinaryNode<T>>;
    height?: number;
    data: T;
  }
}
