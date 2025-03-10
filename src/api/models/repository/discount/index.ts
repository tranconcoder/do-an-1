import _ from 'lodash';
import discountModel from '../../discount.model';

/* ---------------------------------------------------------- */
/*                           Common                           */
/* ---------------------------------------------------------- */
const queryCreate = async (data: modelTypes.discount.DiscountSchema) =>
    await discountModel.create(data);

/* ---------------------------------------------------------- */
/*                           Create                           */
/* ---------------------------------------------------------- */
export const createDiscount = async (
    data: modelTypes.discount.DiscountSchema
) => {
    const discount = await queryCreate(data);

    return _.omit(discount.toObject(), [
        'is_admin_voucher',
        'created_at',
        'updated_at',
        '__v'
    ]);
};
