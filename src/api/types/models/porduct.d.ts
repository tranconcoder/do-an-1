import type { Document } from 'mongoose';
import mongoose from 'mongoose';

export namespace modelTypes {
    module Product {
        enum CategoryEnum {
            Phone = 'Phone',
            Clothes = 'Clothes'
        }

        interface CommonFields {
            product_shop: mongoose.Types.ObjectId;
        }

        interface ProductSchema extends CommonFields {
            product_name: string;
            product_cost: number;
            product_thumb: string;
            product_quantity: number;
            product_description: string;
            product_category: CategoryEnum;
            product_rating_avg: number;
            product_slug: string;
            product_attributes: ProductSchemaType;
            is_draft: boolean;
            is_publish: boolean;
        }

        interface PhoneSchema extends CommonFields {
            phone_processor: string;
            phone_brand: string;
            phone_memory: string;
            phone_storage: number;
            phone_color: string;
            phone_battery: {
                capacity: number;
                battery_techology: string;
                charge_technology?: string;
            };
            phone_warranty: string;
            phone_camera?: {
                front?: string;
                back?: string;
            };
            phone_screen: {
                size: number;
                resolution: {
                    width: number;
                    height: number;
                };
                technology: string;
                max_brightness?: number;
                refresh_rate?: number;
            };
            phone_connectivity: {
                sim_count: number;
                network: string;
                usb: string;
                wifi?: string;
                bluetooth?: string;
                gps?: string;
            };
            phone_special_features: Array<string>;
            phone_material: string;
            phone_weight: number;
            is_smartphone: boolean;
        }

        interface ClothesSchema extends CommonFields {
            size: string;
            color: string;
        }
    }
}

export interface ProductList extends modelTypes.Product.ProductSchema {}

export type ProductListKey = keyof typeof modelTypes.Product.CategoryEnum;
export type ProductListType = ProductList[ProductListKey];

export type ProductAttributeType<T extends ValidProductCategories> =
    T extends 'Phone' ? PhoneSchema : ClothesSchema;

export type ProductPayload<T> = Omit<
    Product<ProductAttributeType<T>>,
    ExtractMethodNames<
        Omit<Product<ProductAttributeType<T>>, 'product_attributes'>
    >
>;
