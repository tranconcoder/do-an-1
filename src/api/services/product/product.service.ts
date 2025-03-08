import mongoose from 'mongoose';
import { CategoryEnum } from '../../enums/product.enum';
import { productModel } from '../../models/product.model';
import { get$SetNestedFromObject } from '../../utils/mongoose.util';
import { deleteOneProduct } from '../../models/repository/product';

export abstract class Product
    implements serviceTypes.product.definition.Product
{
    public _id?: string | mongoose.Types.ObjectId;
    public product_slug?: string;
    public product_rating_avg?: number;
    public product_shop?: string | mongoose.Types.ObjectId;
    public product_name?: string;
    public product_cost?: number;
    public product_thumb?: string;
    public product_quantity?: number;
    public product_description?: string;
    public product_category?: CategoryEnum;
    public product_new_category?: CategoryEnum;
    public product_attributes?: modelTypes.product.ProductSchemaList;
    public is_draft?: boolean;
    public is_publish?: boolean;

    public constructor({
        _id,
        product_slug,
        product_rating_avg,
        product_shop,
        product_name,
        product_cost,
        product_thumb,
        product_quantity,
        product_description,
        product_category,
        product_attributes,
        is_draft,
        is_publish
    }: serviceTypes.product.definition.Product) {
        this._id = _id;
        this.product_slug = product_slug;
        this.product_rating_avg = product_rating_avg;
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

    /* ------------------------------------------------------ */
    /*                     Create product                     */
    /* ------------------------------------------------------ */
    public async createProduct() {
        const { _id, ...validProperties } = this.getValidProperties();

        return await productModel.create({
            _id,
            ...validProperties
        });
    }

    /* ------------------------------------------------------ */
    /*                      Find product                      */
    /* ------------------------------------------------------ */

    /* ------------------------------------------------------ */
    /*                     Update product                     */
    /* ------------------------------------------------------ */
    public async updateProduct() {
        const validProperties = this.getValidProperties();

        /* ------------------- Init set object ------------------ */
        const $set: commonTypes.object.ObjectAnyKeys = {};
        get$SetNestedFromObject(validProperties, $set);

        return await productModel.findOneAndUpdate(
            { _id: this._id },
            { $set },
            { new: true }
        );
    }

    /* ------------------------------------------------------ */
    /*                     Remove product                     */
    /* ------------------------------------------------------ */
    public async removeProduct() {
        return await deleteOneProduct({
            _id: this._id,
            product_shop: this.product_shop
        });
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

    public getProductId() {
        return this._id;
    }

    public setProductId(id: string | mongoose.Types.ObjectId) {
        this._id = id;
    }
}
