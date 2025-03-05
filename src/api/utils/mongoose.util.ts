export const addFieldToSchemaDefinition = <T, K>(schema: T, field: K) => {
    return {
        ...schema,
        ...field
    } as commonTypes.utils.AutoType<T> & commonTypes.utils.AutoType<K>;
};
