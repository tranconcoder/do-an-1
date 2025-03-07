/* ====================================================== */
/*                         CREATE                         */
/* ====================================================== */

import { phoneModel } from '../../product.model';

/* -------------------- Create phone -------------------- */
export const createPhone = async (
    payload: Partial<
        moduleTypes.mongoose.ConvertObjectIdToString<modelTypes.product.PhoneSchema>
    >
) => {
    return await phoneModel.create(payload);
};

/* ====================================================== */
/*                         DELETE                         */
/* ====================================================== */

/* ------------------ Delete one phone ------------------ */
export const deleteOnePhone = async (
    query: Partial<modelTypes.product.PhoneSchema>
) => {
    const result = await phoneModel.deleteOne(query);

    return result.deletedCount;
};
