import type mongooseBase from 'mongoose';

declare global {
    namespace moduleTypes {
        namespace mongoose {
            type ConvertObjectIdToString<T> = {
                [K in keyof T]: T[K] extends mongooseBase.Types.ObjectId
                    ? string
                    : T[K];
            };
        }
    }
}
