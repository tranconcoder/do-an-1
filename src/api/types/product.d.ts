import {
    ClothesSchema,
    PhoneSchema,
    ProductSchema
} from '../models/product.model';
import { Clothes, Phone, Product } from '../services/product.service';

export interface ProductTypes {
    product: typeof Product;
    phone: typeof Phone;
    clothes: typeof Clothes;
}
export type ProductKeys = keyof ProductTypes;

export type ProductAttributeType<T = any> = T extends 'phone'
    ? PhoneSchema
    : T extends 'clothes'
    ? ClothesSchema
    : any;
