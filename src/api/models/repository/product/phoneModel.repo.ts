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
