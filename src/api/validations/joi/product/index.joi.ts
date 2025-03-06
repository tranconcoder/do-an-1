import Joi from 'joi';
import { CategoryEnum } from '../../../enums/product.enum';
import { createPhoneSchema, updatePhoneSchema } from './phone.joi';
import { createClothesSchema, updateClothesSchema } from './cluthes.joi';

/* ====================================================== */
/*                     CREATE PRODUCT                     */
/* ====================================================== */
const createProductAttributes = [createPhoneSchema, createClothesSchema];
export const createProductSchema = Joi.object<
    joiTypes.product.definition.CreateProductSchema,
    true
>({
    product_name: Joi.string().required(),
    product_cost: Joi.number().required(),
    product_thumb: Joi.string().required(),
    product_quantity: Joi.number().required(),
    product_description: Joi.string().required(),
    product_category: Joi.string()
        .valid(...Object.values(CategoryEnum))
        .required(),
    product_attributes: Joi.alternatives()
        .try(...createProductAttributes)
        .required(),
    is_draft: Joi.boolean().required(),
    is_publish: Joi.boolean().required()
});

/* ====================================================== */
/*                     UPDATE PRODUCT                     */
/* ====================================================== */
const updateProductAttributes = [updatePhoneSchema, updateClothesSchema];
export const updateProductSchema = Joi.object<
    joiTypes.product.definition.UpdateProductSchema,
    true
>({
    /* ---------------------- Required ---------------------- */
    product_id: Joi.string().required(),
    product_category: Joi.string()
        .valid(...Object.values(CategoryEnum))
        .required(),

    /* ---------------------- Optional ---------------------- */
    product_name: Joi.string(),
    product_cost: Joi.number(),
    product_thumb: Joi.string(),
    product_quantity: Joi.number(),
    product_description: Joi.string(),
    product_attributes: Joi.alternatives()
        .try(...updateProductAttributes)
        .optional(),
    is_publish: Joi.boolean(),
    is_draft: Joi.boolean()
});

/* ====================================================== */
/*                     DELETE PRODUCT                     */
/* ====================================================== */
export const deleteProductSchema = Joi.object<
    joiTypes.product.definition.DeleteProductSchema,
    true
>({
    product_id: Joi.string().required(),
    product_category: Joi.string()
        .valid(...Object.values(CategoryEnum))
        .required()
});
