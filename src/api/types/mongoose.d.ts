import { Document } from 'mongoose';

declare global {
    namespace mongooseTypes {
        namespace utils {
            type IsDocument<T = false> = T extends true ? Document : {};
        }
    }
}
