import mongoose from 'mongoose';

export type ConvertObjectIdToString<T> = {
    [K in keyof T]: T[K] extends mongoose.Types.ObjectId ? string : T[K];
};
