export type AutoType<T = any> = T extends infer U ? U : unkdown;

export type ExtractMethodNames<T> = {
    [K in keyof T]: T[K] extends (...args: any[]) => any ? K : never;
}[keyof T];

export type ExtractMethods<T> = Pick<T, ExtractMethodNames<T>>;
