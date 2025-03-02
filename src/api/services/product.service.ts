import type { IntRange } from '../types/number';
import type {
    ProductAttributeType,
    ProductList,
    ProductListKey,
    ProductListType
} from '../types/product';
import type { ClothesSchema, PhoneSchema } from '../models/product.model';
import type { HydratedDocument } from 'mongoose';

import mongoose from 'mongoose';
import productModel, {
    clothesModel,
    phoneModel
} from '../models/product.model';
import { BadRequestErrorResponse } from '../response/error.response';
import { ExtractMethodNames } from '../types/common';

/* ====================================================== */
/*                     CREATE PRODUCT                     */
/* ====================================================== */
export abstract class Product<T = any> {
    public constructor(
        public product_shop: mongoose.Types.ObjectId,
        public product_name: string,
        public product_cost: number,
        public product_thumb: string,
        public product_quantity: number,
        public product_description: string,
        public product_category: ProductListKey,
        public product_rating: IntRange<0, 6>,
        public product_attributes: T
    ) {
        this.product_shop = product_shop;
        this.product_name = product_name;
        this.product_cost = product_cost;
        this.product_thumb = product_thumb;
        this.product_quantity = product_quantity;
        this.product_description = product_description;
        this.product_category = product_category;
        this.product_rating = product_rating;
        this.product_attributes = product_attributes;
    }

    public async createProduct(): Promise<HydratedDocument<this>> {
        return (await productModel.create(
            this
        )) as any as HydratedDocument<this>;
    }

    public async removeProduct(id: string): Promise<void> {
        await productModel.deleteOne({ _id: id });
    }
}

/* ====================================================== */
/*                     CREATE SERVICES                    */
/* ====================================================== */
export default class ProductFactory {
    private static productRegistered: ProductList = {} as any;

    public static registerProduct(
        key: ProductListKey,
        classRef: ProductListType
    ) {
        this.productRegistered[key] = classRef;
    }

    public static async createProduct<K extends ProductListKey>(
        type: K,
        payload: Omit<
            Product<ProductAttributeType<K>>,
            ExtractMethodNames<Omit<Product, 'product_attributes'>>
        >
    ) {
        const ServiceClass: any = this.productRegistered[type];
        if (!ServiceClass) throw new Error('Invalid type');

        const instance = new ServiceClass(
            payload.product_shop,
            payload.product_name,
            payload.product_cost,
            payload.product_thumb,
            payload.product_quantity,
            payload.product_description,
            payload.product_category,
            payload.product_rating,
            payload.product_attributes
        );

        return (await instance.createProduct()) as HydratedDocument<
            typeof payload.product_attributes
        >;
    }
}

export class Phone extends Product<PhoneSchema> {
    public async createProduct() {
        const product = await super.createProduct();
        if (!product) throw new BadRequestErrorResponse('Save product failed');

        const phone = await phoneModel.create({
            ...this.product_attributes,
            _id: product._id,
            product_shop: product.product_shop
        });
        if (!phone) throw new BadRequestErrorResponse('Save phone failed');

        return product;
    }

    public async removeProduct(id: string) {
        await Promise.all([
            super.removeProduct(id),
            phoneModel.deleteOne({ _id: id })
        ]);
    }
}

export class Clothes extends Product<ClothesSchema> {
    public async createProduct() {
        const product = await super.createProduct();
        if (!product) throw new BadRequestErrorResponse('Save product failed');

        const clothes = await clothesModel.create({
            ...this.product_attributes,
            _id: product._id,
            product_shop: product.product_shop
        });
        if (!clothes) throw new BadRequestErrorResponse('Save clothes failed');

        return product;
    }

    public async removeProduct(id: string) {}
}

/* ====================================================== */
/*                    REGISTER PRODUCT                    */
/* ====================================================== */
ProductFactory.registerProduct('Phone', Phone);
ProductFactory.registerProduct('Clothes', Clothes);
