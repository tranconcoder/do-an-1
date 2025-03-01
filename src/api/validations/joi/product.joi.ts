import type { IntRange } from '../../types/number';

import * as Joi from '@hapi/joi';
import 'joi-extract-type';

/* ====================================================== */
/*                      PHONE PRODUCT                     */
/* ====================================================== */
export const phoneSchema = Joi.object({
    memory: Joi.string().required(),
    color: Joi.string().required()
});
export type PhoneJoiSchema = Joi.extractType<typeof phoneSchema>;

/* ====================================================== */
/*                    CLOUTHES PRODUCT                    */
/* ====================================================== */
export const clothesSchema = Joi.object({
    size: Joi.string().required(),
    color: Joi.string().required()
});
export type ClothesJoiSchema = Joi.extractType<typeof clothesSchema>;

/* ====================================================== */
/*                         PRODUCT                        */
/* ====================================================== */
export const productSchema = Joi.object({
    product_name: Joi.string().required(),
    product_cost: Joi.number().required(),
    product_thumb: Joi.string().required(),
    product_quantity: Joi.number().required(),
    product_description: Joi.string().required(),
    product_category: Joi.string().required(),
    product_rating: Joi.number().required().valid(0, 1, 2, 3, 4, 5),
    product_attributes: Joi.alternatives()
        .try(clothesSchema, phoneSchema)
        .required()
});
export type ProductJoiSchema = {
    product_rating: IntRange<0, 6>;
} & Joi.extractType<typeof productSchema>;
