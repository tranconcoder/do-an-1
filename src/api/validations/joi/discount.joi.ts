import Joi from 'joi';
import { mongooseId } from '../../../configs/joi.config';

/* ---------------------------------------------------------- */
/*                           Create                           */
/* ---------------------------------------------------------- */
export const createDiscountSchema =
    Joi.object<joiTypes.discount.CreateDiscount>({
        discount_code: Joi.string().length(6).required(),
        discount_count: Joi.number().greater(0).required(),
        discount_name: Joi.string().required(),
        discount_type: Joi.string()
            .valid('percentage', 'fixed')
            .default('percentage'),
        discount_value: Joi.number().greater(0).required(),
        discount_min_cost: Joi.number().greater(0).optional(),
        discount_products: Joi.array().items(mongooseId).optional(),
        discount_start_at: Joi.date().required(),
        discount_end_at: Joi.date()
            .greater(Joi.ref('discount_start_at'))
            .required()
    });
