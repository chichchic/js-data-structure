declare module "Global" {
  export type compareFuncType = <T>(a: T, b: T) => boolean;
  export type pointer<T, O> = O | null;
}
