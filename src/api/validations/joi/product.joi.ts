import * as Joi from '@hapi/joi';
import 'joi-extract-type';
import { PRODUCT_CATEGORY_ENUM } from '../../models/product.model';

/* ====================================================== */
/*                      PHONE PRODUCT                     */
/* ====================================================== */
export const phoneSchema = Joi.object({
    memory: Joi.string().required(),
    color: Joi.string().required()
});

/* ====================================================== */
/*                    CLOUTHES PRODUCT                    */
/* ====================================================== */
export const clothesSchema = Joi.object({
    size: Joi.string().required(),
    color: Joi.string().required()
});

/* ====================================================== */
/*                         PRODUCT                        */
/* ====================================================== */
export const productSchema = Joi.object({
    product_name: Joi.string().required(),
    product_cost: Joi.number().required(),
    product_thumb: Joi.string().required(),
    product_quantity: Joi.number().required(),
    product_description: Joi.string().required(),
    product_category: Joi.string().required().valid(PRODUCT_CATEGORY_ENUM),
    product_rating: Joi.number().required().valid(0, 1, 2, 3, 4, 5),
    product_attributes: Joi.alternatives()
        .try(clothesSchema, phoneSchema)
        .required()
});
