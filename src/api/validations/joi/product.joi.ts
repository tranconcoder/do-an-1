import Joi from 'joi';
import { modelTypes } from '../../types/models/porduct';
import { ConvertObjectIdToString } from '../../types/mongoose';

/* ====================================================== */
/*                      PHONE PRODUCT                     */
/* ====================================================== */
export const phoneSchema = Joi.object<
    ConvertObjectIdToString<modelTypes.Product.PhoneSchema>,
    true
>({
    product_shop: Joi.string().required(),
    phone_processor: Joi.string().required(),
    phone_brand: Joi.string().required(),
    phone_memory: Joi.string().required(),
    phone_storage: Joi.number().required(),
    phone_color: Joi.string().required(),
    phone_battery: Joi.object({
        capacity: Joi.number().required(),
        battery_techology: Joi.string().required(),
        charge_technology: Joi.string()
    }).required(),
    phone_warranty: Joi.string().required(),
    phone_camera: Joi.object({
        front: Joi.string(),
        back: Joi.string()
    }),
    phone_screen: Joi.object({
        size: Joi.number().required(),
        resolution: Joi.object({
            width: Joi.number().required(),
            height: Joi.number().required()
        }).required(),
        technology: Joi.string().required(),
        max_brightness: Joi.number(),
        refresh_rate: Joi.number()
    }).required(),
    phone_connectivity: Joi.object<
        modelTypes.Product.PhoneSchema['phone_connectivity'],
        true
    >({
        sim_count: Joi.number().required(),
        network: Joi.string().required(),
        usb: Joi.string().required(),
        wifi: Joi.string(),
        bluetooth: Joi.string(),
        gps: Joi.string()
    }).required(),
    phone_special_features: Joi.array().items(Joi.string()).required(),
    phone_material: Joi.string().required(),
    phone_weight: Joi.number().required(),
    is_smartphone: Joi.boolean().required()
});

/* ====================================================== */
/*                    CLOTHES PRODUCT                     */
/* ====================================================== */
export const clothesSchema = Joi.object({
    size: Joi.string().required(),
    color: Joi.string().required()
});

/* ====================================================== */
/*                         PRODUCT                        */
/* ====================================================== */
export const createProductSchema = Joi.object<
    ConvertObjectIdToString<modelTypes.Product.ProductSchema>,
    true
>({
    product_shop: Joi.string().required(),
    product_name: Joi.string().required(),
    product_cost: Joi.number().required(),
    product_thumb: Joi.string().required(),
    product_quantity: Joi.number().required(),
    product_description: Joi.string().required(),
    product_category: Joi.string()
        .valid(...Object.values(modelTypes.Product.CategoryEnum))
        .required(),
    product_rating_avg: Joi.number().required().valid(0, 1, 2, 3, 4, 5),
    product_slug: Joi.string().required(),
    product_attributes: Joi.alternatives()
        .try(clothesSchema, phoneSchema)
        .required(),
    is_draft: Joi.boolean().required(),
    is_publish: Joi.boolean().required()
});

export const deleteProductSchema = Joi.object({
    product_id: Joi.string().required()
});
