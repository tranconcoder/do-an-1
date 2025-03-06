/* ----------------------- Configs ---------------------- */
import { getProduct } from '../../../configs/product.config';
import mongoose from 'mongoose';
import { productModel } from '../../models/product.model';
import { NotFoundErrorResponse } from '../../response/error.response';
import { CategoryEnum } from '../../enums/product.enum';
import { findProductByShopAndId } from '../../models/repository/product.repo';

/* ====================================================== */
/*                      CREATOR CLASS                     */
/* ====================================================== */
export abstract class Product
    implements serviceTypes.product.arguments.CreateProduct
{
    public _id?: mongoose.Types.ObjectId;
    public product_shop?: mongoose.Types.ObjectId;
    public product_name?: string;
    public product_cost?: number;
    public product_thumb?: string;
    public product_quantity?: number;
    public product_description?: string;
    public product_category?: CategoryEnum;
    public product_attributes?: modelTypes.product.ProductSchemaList;
    public is_draft?: boolean;
    public is_publish?: boolean;

    public constructor({
        product_shop,
        product_name,
        product_cost,
        product_thumb,
        product_quantity,
        product_description,
        product_category,
        product_attributes,
        is_draft,
        is_publish,
        _id = new mongoose.Types.ObjectId()
    }: Partial<modelTypes.product.ProductSchema<true>>) {
        this._id = _id as mongoose.Types.ObjectId;
        this.product_shop = product_shop;
        this.product_name = product_name;
        this.product_cost = product_cost;
        this.product_thumb = product_thumb;
        this.product_quantity = product_quantity;
        this.product_description = product_description;
        this.product_category = product_category;
        this.product_attributes = product_attributes;
        this.is_draft = is_draft;
        this.is_publish = is_publish;
    }

    /* ------------------- Create product ------------------- */
    public async createProduct() {
        return await productModel.create(this.getValidProperties());
    }

    /* ------------------- Update product ------------------- */
    public async updateProduct() {
        return await productModel.updateOne(
            { _id: this._id },
            this.getValidProperties()
        );
    }

    /* ------------------- Remove product ------------------- */
    public async removeProduct(): Promise<void> {
        await productModel.deleteOne({ _id: this._id });
    }

    private getValidProperties() {
        const validProperties: serviceTypes.product.definition.Product = {};

        Object.keys(this).forEach((k) => {
            const key = k as keyof typeof validProperties;

            if (this[key] !== undefined) {
                Object.assign(validProperties, { [key]: this[key] });
            }
        });

        return validProperties;
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
    /* ------------------- Create product ------------------- */
    public static createProduct = async <
        K extends modelTypes.product.ProductList
    >(
        type: K,
        payload: serviceTypes.product.arguments.CreateProduct
    ) => {
        const serviceClass = await getProduct<K>(type);
        if (!serviceClass)
            throw new NotFoundErrorResponse('Not found product service');

        const instance = new serviceClass(payload as any);

        return await instance.createProduct();
    };

    /* ------------------- Update product ------------------- */
    public static updateProduct = async (
        payload: serviceTypes.product.arguments.UpdateProduct
    ) => {
        console.log(payload);
        const serviceClass = await getProduct(payload.product_category);
        const instance = new serviceClass(payload);

        return instance.updateProduct();
    };

    /* ------------------- Remove product ------------------- */
    public static removeProduct = async <
        K extends modelTypes.product.ProductList
    >(
        type: K,
        id: serviceTypes.product.arguments.RemoveProduct
    ) => {
        const serviceClass = await getProduct<K>(type);
        if (!serviceClass)
            throw new NotFoundErrorResponse('Not found product service');

        const objId = new mongoose.Types.ObjectId(id);
        const instance = new serviceClass({ _id: objId });

        return await instance.removeProduct();
    };
}
