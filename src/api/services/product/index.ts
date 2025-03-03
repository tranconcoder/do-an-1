import type { Document } from 'mongoose';

/* ----------------------- Configs ---------------------- */
import { getProduct } from '../../../configs/product.config';
import mongoose from 'mongoose';
import { IntRange } from '../../types/number';
import { modelTypes, ProductListKey } from '../../types/models/porduct';
import { productModel } from '../../models/product.model';
import { importProductService } from '../../utils/product.util';

/* ====================================================== */
/*                      CREATOR CLASS                     */
/* ====================================================== */
export abstract class Product<T = any>
    implements modelTypes.Product.ProductSchema
{
    public _id: mongoose.Types.ObjectId;
    public product_shop: mongoose.Types.ObjectId;
    public product_name: string;
    public product_cost: number;
    public product_thumb: string;
    public product_quantity: number;
    public product_description: string;
    public product_category: modelTypes.Product.CategoryEnum;
    public product_rating_avg: number;
    public product_attributes: T;
    public is_draft: boolean;
    public is_publish: boolean;
    public product_slug: string;

    public constructor({
        product_shop,
        product_name,
        product_cost,
        product_thumb,
        product_quantity,
        product_description,
        product_category,
        product_rating_avg,
        product_attributes,
        is_draft,
        is_publish,
        product_slug,
        _id = new mongoose.Types.ObjectId()
    }: Partial<modelTypes.Product.ProductSchema & Document>) {
        this._id = _id as mongoose.Types.ObjectId;
        this.product_shop = product_shop || new mongoose.Types.ObjectId();
        this.product_name = product_name || '';
        this.product_cost = product_cost || 0;
        this.product_thumb = product_thumb || '';
        this.product_quantity = product_quantity || 0;
        this.product_description = product_description || '';
        this.product_category =
            product_category || modelTypes.Product.CategoryEnum.Phone;
        this.product_rating_avg = product_rating_avg || 0;
        this.product_attributes = (product_attributes || {}) as T;
        this.is_draft = is_draft || true;
        this.is_publish = is_publish || false;
        this.product_slug = product_slug || '';
    }

    public async createProduct() {
        return await productModel.create(this);
    }

    public async removeProduct(): Promise<void> {
        await productModel.deleteOne({ _id: this._id });
    }

    public getProductShop() {
        return this.product_shop;
    }
    public getId() {
        return this._id;
    }
    public setId(id: mongoose.Types.ObjectId) {
        this._id = id;
    }
}

/* ====================================================== */
/*                         FACTORY                        */
/* ====================================================== */
export default class ProductFactory {
    public static createProduct = async <K extends ProductListKey>(
        type: K,
        payload: modelTypes.Product.ProductSchema
    ) => {
        const classNew = importProductService();
        const serviceClass = await getProduct<K>(type);
        if (!serviceClass) throw new Error('Invalid type');

        const instance = new serviceClass(payload as any);

        return await instance.createProduct();
    };

    public static removeProduct = async (id: string) => {};
}
