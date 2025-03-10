import Joi from 'joi';
import { mongooseId } from '../../../configs/joi.config';

/* ---------------------------------------------------------- */
/*                           Create                           */
/* ---------------------------------------------------------- */
export const createDiscountSchema = Joi.object<
    joiTypes.discount.CreateDiscount,
    true
>({
    discount_code: Joi.string().length(6).alphanum().required(),
    discount_count: Joi.number().greater(0),
    discount_name: Joi.string().required(),
    discount_type: Joi.string().valid('percentage', 'fixed').required(),
    discount_value: Joi.number().greater(0).required(),
    discount_min_cost: Joi.number().greater(0).optional(),
    discount_products: Joi.array().items(mongooseId).optional(),
    discount_start_at: Joi.date().required(),
    discount_end_at: Joi.date()
        .greater(Joi.ref('discount_start_at'))
        .required(),
    is_available: Joi.boolean(),
    is_publish: Joi.boolean()
});
