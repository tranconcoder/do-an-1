import '';

declare global {
    namespace modelTypes {
        namespace utils {
            type IsDocument<T> = T extends true ? Document : {};
        }
    }
}
