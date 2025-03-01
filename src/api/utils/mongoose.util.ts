import { AutoType } from '../types/common';
import { ObjectAnyKeys } from '../types/object';

export const addFieldToSchemaDefinition = <T, K>(schema: T, field: K) => {
    return {
        ...schema,
        ...field
    } as AutoType<T> & AutoType<K>;
};
