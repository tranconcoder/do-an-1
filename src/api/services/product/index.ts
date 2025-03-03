import type { Document } from 'mongoose';

/* ----------------------- Configs ---------------------- */
import { getProduct } from '../../../configs/product.config';
import mongoose from 'mongoose';
import { modelTypes } from '../../types/models/product';
import { productModel } from '../../models/product.model';
import { NotFoundErrorResponse } from '../../response/error.response';
import { CategoryEnum } from '../../enums/product.enum';

/* ====================================================== */
/*                      CREATOR CLASS                     */
/* ====================================================== */
export abstract class Product<T = any>
    implements modelTypes.product.ProductSchema
{
    public _id: mongoose.Types.ObjectId;
    public product_shop: mongoose.Types.ObjectId;
    public product_name: string;
    public product_cost: number;
    public product_thumb: string;
    public product_quantity: number;
    public product_description: string;
    public product_category: CategoryEnum;
    public product_rating_avg: number;
    public product_attributes: modelTypes.product.ProductList;
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
    }: Partial<modelTypes.product.ProductSchema & Document>) {
        this._id = _id as mongoose.Types.ObjectId;
        this.product_shop = product_shop || new mongoose.Types.ObjectId();
        this.product_name = product_name || '';
        this.product_cost = product_cost || 0;
        this.product_thumb = product_thumb || '';
        this.product_quantity = product_quantity || 0;
        this.product_description = product_description || '';
        this.product_category = product_category || CategoryEnum.Phone;
        this.product_rating_avg = product_rating_avg || 0;
        this.product_attributes = (product_attributes ||
            {}) as modelTypes.product.ProductList;
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
    public static createProduct = async <
        K extends modelTypes.product.ProductListKey
    >(
        type: K,
        payload: modelTypes.product.ProductSchema
    ) => {
        const serviceClass = await getProduct<K>(type);
        if (!serviceClass)
            throw new NotFoundErrorResponse('Not found product service');

        const instance = new serviceClass(payload as any);

        return await instance.createProduct();
    };

    public static removeProduct = async <
        K extends modelTypes.product.ProductListKey
    >(
        type: K,
        id: string
    ) => {
        const serviceClass = await getProduct<K>(type);
        if (!serviceClass)
            throw new NotFoundErrorResponse('Not found product service');

        const objId = new mongoose.Types.ObjectId(id);
        const instance = new serviceClass({ _id: objId });

        return await instance.removeProduct();
    };
}
