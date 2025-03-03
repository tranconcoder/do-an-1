export type AutoType<T = any> = T extends infer U ? U : unkdown;

export type ExtractMethodNames<T> = {
    [K in keyof T | undefined]: K extends undefined
        ? never
        : T[K] extends (...args: any[]) => any
        ? K
        : never;
}[keyof T];

export type ExtractMethods<T> = Pick<T, ExtractMethodNames<T>>;

export type ExtractInstanceType<T> = T extends new (...args: any[]) => infer R
    ? R
    : T extends { prototype: infer P }
    ? P
    : any;

export type UnionToPartialIntersection<U> = (
    U extends any ? (k: U) => void : never
) extends (k: infer I) => void
    ? Partial<I>
    : never;
