import _ from 'lodash';
import { createDiscount } from '../models/repository/discount/index';

export default class DiscountService {
    /* -------------------- Create discount  -------------------- */
    public static createDiscount = async ({
        userId,
        ...payload
    }: serviceTypes.discount.arguments.CreateDiscount) => {
        /* ---------------------------------------------------------- */
        /*           Missing check is admin voucher by shop           */
        /* ---------------------------------------------------------- */

        return await createDiscount({
            ...payload,
            discount_shop: userId
        });
    };
}
