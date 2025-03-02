import { ClothesSchema, PhoneSchema } from '../models/product.model';
import { Clothes, Phone } from '../services/product.service';
import { PRODUCT_CATEGORY_ENUM } from '../models/product.model';

export type ValidProductCategories = (typeof PRODUCT_CATEGORY_ENUM)[number];

export interface ProductList extends Record<ValidProductCategories, any> {}

export type ProductListType = ProductList[ValidProductCategories];
export type ProductListKey = ValidProductCategories;

export type ProductAttributeType<T extends ValidProductCategories> =
    T extends 'Phone' ? PhoneSchema : ClothesSchema;
