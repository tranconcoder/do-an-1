import '';

declare global {
    namespace modelTypes {
        namespace utils {
            type IsDocument<T> = T extends true ? Document : {};

            type RemoveNever<T> = {
                [K in keyof T as T[K] extends never ? never : K]: T[K];
            };
        }
    }
}
