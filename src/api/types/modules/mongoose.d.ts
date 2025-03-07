import type mongooseBase from 'mongoose';
import mongoose, { HydratedDocument, Models } from 'mongoose';
import mongooseLib, { Document, model, Model } from 'mongoose';

declare global {
    namespace moduleTypes {
        namespace mongoose {
            type ConvertObjectIdToString<T> = {
                [K in keyof T]: T[K] extends mongooseBase.Types.ObjectId
                    ? string
                    : T[K];
            };

            type IsModel<T = false, K = any> = T extends true
                ? mongooseLib.Model<{}, {}, {}, {}, HydratedDocument<K>>
                : {};
        }
    }
}
