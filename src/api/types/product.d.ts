import { ClothesSchema, PhoneSchema } from '../models/product.model';
import { Clothes, Phone } from '../services/product.service';
import { PRODUCT_CATEGORY_ENUM } from '../models/product.model';

export interface ProductList {
    Phone: typeof Phone;
    Clothes: typeof Clothes;
}

export type ProductListType = ProductList[ValidProductCategories];
export type ProductListKey = keyof ProductList;

export type ProductAttributeType<T extends ValidProductCategories> =
    T extends 'phone' ? PhoneSchema : ClothesSchema;
