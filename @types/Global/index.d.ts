declare module "Global" {
  export type compareFuncType<T> = (a: T, b: T) => boolean;
  export type pointer<T> = T | null;
}
