import Joi from 'joi';
import { CategoryEnum } from '../../../enums/product.enum';
import { createPhoneSchema, updatePhoneSchema } from './phone.joi';
import { createClothesSchema, updateClothesSchema } from './cluthes.joi';

/* ====================================================== */
/*                     CREATE PRODUCT                     */
/* ====================================================== */
const createProductAttributes = {
    [CategoryEnum.Phone]: createPhoneSchema,
    [CategoryEnum.Clothes]: createClothesSchema
};
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
    product_attributes: Joi.when(
        'product_category',
        Object.values(CategoryEnum).map((v) => ({
            is: v,
            then: Joi.alternatives().try(createProductAttributes[v])
        }))
    ).required(),
    is_draft: Joi.boolean(),
    is_publish: Joi.boolean()
});

/* ====================================================== */
/*                     UPDATE PRODUCT                     */
/* ====================================================== */
const updateProductAttributes = {
    [CategoryEnum.Phone]: updatePhoneSchema,
    [CategoryEnum.Clothes]: updateClothesSchema
};
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
    product_new_category: Joi.string()
        .valid(...Object.values(CategoryEnum))
        .default(Joi.ref('product_category')),
    product_name: Joi.string(),
    product_cost: Joi.number(),
    product_thumb: Joi.string(),
    product_quantity: Joi.number(),
    product_description: Joi.string(),

    // When update category ==> add new attributes schema
    // Not update ==> update attributes schema
    product_attributes: Joi.when('product_new_category', {
        switch: Object.values(CategoryEnum).map((category) => ({
            is: category,
            then: Joi.when('product_new_category', {
                is: Joi.ref('product_category'),
                then: updateProductAttributes[category],
                otherwise: createProductAttributes[category]
            })
        }))
    }).when(Joi.ref('product_new_category'), {
        switch: [
            ...Object.values(CategoryEnum).map((category) => ({
                is: category,
                then: {
                    is: Joi.ref('product_category'),
                    then: updateProductAttributes[category],
                    otherwise: createProductAttributes[category]
                }
            }))
        ]
    }),
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
