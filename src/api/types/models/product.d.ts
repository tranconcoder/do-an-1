import { ClothesSchema, PhoneSchema } from '../../models/product.model';
import { Clothes, Phone } from '../services/product.service';
import { PRODUCT_CATEGORY_ENUM } from '../../models/product.model';
import { Product } from '../../services/product';
import { ExtractMethodNames } from '../common';
import mongoose, { models } from 'mongoose';

export type ValidProductCategories = (typeof PRODUCT_CATEGORY_ENUM)[number];

export interface ProductList extends Record<ValidProductCategories, any> {}

export type ProductListType = ProductList[ValidProductCategories];
export type ProductListKey = ValidProductCategories;

export type ProductAttributeType<T extends ValidProductCategories> =
    T extends 'Phone' ? PhoneSchema : ClothesSchema;

export type ProductPayload<T> = Omit<
    Product<ProductAttributeType<T>>,
    ExtractMethodNames<
        Omit<Product<ProductAttributeType<T>>, 'product_attributes'>
    >
>;

/* ====================================================== */
/*                      SCHEMA MODEL                      */
/* ====================================================== */

/* -------------------- Phone schema -------------------- */
