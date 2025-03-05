import '';

declare global {
    namespace commonTypes {
        /* ====================================================== */
        /*                          UTILS                         */
        /* ====================================================== */
        namespace utils {
            type RemoveNever<T> = {
                [K in keyof T as T[K] extends never ? never : K]: T[K];
            };

            type AutoType<T = any> = T extends infer U ? U : unkdown;

            type ExtractMethodNames<T> = {
                [K in keyof T | undefined]: K extends undefined
                    ? never
                    : T[K] extends (...args: any[]) => any
                    ? K
                    : never;
            }[keyof T];

            type ExtractMethods<T> = Pick<T, ExtractMethodNames<T>>;

            type ExtractInstanceType<T> = T extends new (
                ...args: any[]
            ) => infer R
                ? R
                : T extends { prototype: infer P }
                ? P
                : any;

            type UnionToPartialIntersection<U> = (
                U extends any ? (k: U) => void : never
            ) extends (k: infer I) => void
                ? I | undefined
                : never;
        }

        /* ====================================================== */
        /*                         NUMBER                         */
        /* ====================================================== */
        namespace number {
            type Enumerate<
                N extends number,
                Acc extends number[] = []
            > = Acc['length'] extends N
                ? Acc[number]
                : Enumerate<N, [...Acc, Acc['length']]>;

            type IntRange<F extends number, T extends number> = Exclude<
                Enumerate<T>,
                Enumerate<F>
            >;
        }

        /* ====================================================== */
        /*                         OBJECT                         */
        /* ====================================================== */
        namespace object {
            type ObjectAnyKeys<T = any> = Object & {
                [key: string]: T;
            };
        }

        /* ====================================================== */
        /*                         STRING                         */
        /* ====================================================== */
        namespace string {
            type StringOrUndefined = string | undefined;
        }
    }
}
