import type {
    ExtractInstanceType,
    ExtractMethodNames
} from '../../types/common';
import type {
    ProductAttributeType,
    ProductList,
    ProductListKey,
    ProductListType,
    ProductPayload,
    ValidProductCategories
} from '../../types/models/product';
import type { HydratedDocument } from 'mongoose';

/* ----------------------- Configs ---------------------- */
import {
    getProduct,
    GetProductReturnType
} from '../../../configs/product.config';
import mongoose from 'mongoose';
import { IntRange } from '../../types/number';
import productModel from '../../models/product.model';
import Clothes from './clothes.service';
import { Phone } from './phone.service';

/* ====================================================== */
/*                      CREATOR CLASS                     */
/* ====================================================== */
export abstract class Product<T = any> {
    public product_shop: mongoose.Types.ObjectId;
    public product_name: string;
    public product_cost: number;
    public product_thumb: string;
    public product_quantity: number;
    public product_description: string;
    public product_category: ProductListKey;
    public product_rating: IntRange<0, 6>;
    public product_attributes: T;
    public _id: mongoose.Types.ObjectId;

    public constructor({
        product_shop,
        product_name,
        product_cost,
        product_thumb,
        product_quantity,
        product_description,
        product_category,
        product_rating,
        product_attributes,
        _id = new mongoose.Types.ObjectId()
    }: Omit<
        Product<T>,
        ExtractMethodNames<Omit<Product, 'product_attributes'>>
    >) {
        this.product_shop = product_shop;
        this.product_name = product_name;
        this.product_cost = product_cost;
        this.product_thumb = product_thumb;
        this.product_quantity = product_quantity;
        this.product_description = product_description;
        this.product_category = product_category;
        this.product_rating = product_rating;
        this.product_attributes = product_attributes;
        this._id = _id;
    }

    public async createProduct(): Promise<HydratedDocument<this>> {
        return (await productModel.create({
            ...this,
            _id: this._id
        })) as any as HydratedDocument<this>;
    }

    public async removeProduct(id: string): Promise<void> {
        await productModel.deleteOne({ _id: id });
    }

    protected getProductShop() {
        return this.product_shop;
    }
    protected getId() {
        return this._id;
    }
    protected setId(id: mongoose.Types.ObjectId) {
        this._id = id;
    }
}

/* ====================================================== */
/*                         FACTORY                        */
/* ====================================================== */
export default class ProductFactory {
    public static createProduct = async <K extends ProductListKey>(
        type: K,
        payload: ProductPayload<K>
    ) => {
        const serviceClass = await getProduct<K>(type);
        if (!serviceClass) throw new Error('Invalid type');

        const instance = new serviceClass(payload as any);

        return await instance.createProduct();
    };

    public static removeProduct = async (id: string) => {};
}
