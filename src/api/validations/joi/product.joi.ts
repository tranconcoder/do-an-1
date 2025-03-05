import Joi from 'joi';
import { CategoryEnum } from '../../enums/product.enum';

/* ====================================================== */
/*                      PHONE PRODUCT                     */
/* ====================================================== */
export const phoneSchema = Joi.object<joiTypes.product.PhoneSchema, true>({
    phone_processor: Joi.string().required(),
    phone_brand: Joi.string().required(),
    phone_memory: Joi.string().required(),
    phone_storage: Joi.number().required(),
    phone_color: Joi.string().required(),
    phone_battery: Joi.object<
        joiTypes.product.PhoneSchema['phone_battery'],
        true
    >({
        capacity: Joi.number().required(),
        battery_techology: Joi.string().required(),
        charge_technology: Joi.string()
    }).required(),
    phone_warranty: Joi.string().required(),
    phone_camera: Joi.object<
        modelTypes.product.PhoneSchema['phone_camera'],
        true
    >({
        front: Joi.string().optional(),
        back: Joi.string().optional()
    }),
    phone_screen: Joi.object<
        modelTypes.product.PhoneSchema['phone_screen'],
        true
    >({
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
        modelTypes.product.PhoneSchema['phone_connectivity'],
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
export const clothesSchema = Joi.object<joiTypes.product.ClothesSchema, true>({
    size: Joi.string().required(),
    color: Joi.string().required()
});

/* ====================================================== */
/*                         PRODUCT                        */
/* ====================================================== */
export const createProductSchema = Joi.object<
    joiTypes.product.CreateProductSchema,
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
        .try(clothesSchema, phoneSchema)
        .required(),
    is_draft: Joi.boolean().required(),
    is_publish: Joi.boolean().required()
});

export const deleteProductSchema = Joi.object<
    joiTypes.product.DeleteProductSchema,
    true
>({
    product_id: Joi.string().required(),
    product_category: Joi.string()
        .valid(...Object.values(CategoryEnum))
        .required()
});
