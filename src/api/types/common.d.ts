export type AutoType<T = any> = T extends infer U ? U : unkdown;
