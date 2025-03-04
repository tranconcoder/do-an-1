import type mongoose from 'mongoose';

declare global {
    namespace moduleTypes {
        namespace mongoose {
            type ConvertObjectIdToString<T> = {
                [K in keyof T]: T[K] extends mongoose.Types.ObjectId
                    ? string
                    : T[K];
            };
        }
    }
}
