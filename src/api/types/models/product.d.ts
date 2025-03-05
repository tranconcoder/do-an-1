import type { Document } from 'mongoose';
import type mongoose from 'mongoose';
import type { CategoryEnum } from '../../enums/product.enum';
import { Product } from '../../services/product';
import { extend } from 'lodash';

declare global {
    namespace modelTypes {
        namespace product {
            type ProductListKey = keyof typeof CategoryEnum;
            type ProductList<T = false> = Partial<
                PhoneSchema<T> & ClothesSchema<T>
            >;
            type ProductUnion<T = false> = PhoneSchema<T> | ClothesSchema<T>;

            type CommonFields<T> = utils.IsDocument<T> & {
                product_shop: mongoose.Types.ObjectId;
            };

            type ProductSchema<T = false> = CommonFields<T> & {
                product_name: string;
                product_cost: number;
                product_thumb: string;
                product_quantity: number;
                product_description: string;
                product_category: CategoryEnum;
                product_attributes: ProductList<T>;
                is_draft: boolean;
                is_publish: boolean;
                product_rating_avg: number;
                product_slug: string;
            };

            type PhoneSchema<T = false> = CommonFields<T> & {
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
                phone_camera: {
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
            };

            type ClothesSchema<T = false> = CommonFields<T> & {
                size: string;
                color: string;
            };
        }

        namespace utils {
            type IsDocument<T> = T extends true ? Document : {};

            type RemoveNever<T> = {
                [K in keyof T as T[K] extends never ? never : K]: T[K];
            };
        }
    }
}
