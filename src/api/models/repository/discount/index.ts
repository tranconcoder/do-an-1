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
    return await queryCreate(data);
};
