/* ----------------------- Configs ---------------------- */
import { getProduct } from '../../../configs/product.config';
import mongoose from 'mongoose';
import { productModel } from '../../models/product.model';
import {
    BadRequestErrorResponse,
    NotFoundErrorResponse
} from '../../response/error.response';
import { CategoryEnum } from '../../enums/product.enum';
import {
    findProductById,
    findProductByShopAndId,
    findProductCategoryById
} from '../../models/repository/product.repo';
import { get$SetNestedFromObject } from '../../utils/mongoose.util';

/* ====================================================== */
/*                      CREATOR CLASS                     */
/* ====================================================== */
export abstract class Product
    implements serviceTypes.product.definition.Product
{
    public product_id?: string;
    public product_shop?: string;
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
        product_id,
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
        this.product_id = product_id;
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
        const { product_id, ...validProperties } = this.getValidProperties();

        return await productModel.create({
            _id: product_id,
            ...validProperties
        });
    }

    /* ------------------- Update product ------------------- */
    public async updateProduct() {
        const validProperties = this.getValidProperties();

        /* ------------------- Init set object ------------------ */
        const set: commonTypes.object.ObjectAnyKeys = {};
        get$SetNestedFromObject(validProperties, set);
        console.log(set);

        return await productModel.updateOne(
            { _id: this.product_id },
            {
                $set: set
            }
        );
    }

    /* ------------------- Remove product ------------------- */
    public async removeProduct(): Promise<void> {
        await productModel.deleteOne({ _id: this.product_id });
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
        return this.product_id;
    }
    public setProductId(id: string) {
        this.product_id = id;
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
        const product = await findProductById(payload.product_id);

        if (!product) throw new NotFoundErrorResponse('Not found product');
        if (product.product_category !== payload.product_category)
            throw new BadRequestErrorResponse(
                `Current product category not is '${payload.product_category}'`
            );

        /* ----------------- Remove old category ---------------- */
        /* ---------------- When changed category --------------- */
        if (
            payload.product_new_category &&
            payload.product_category !== payload.product_new_category
        ) {
            const removeServiceClass = await getProduct(
                payload.product_category
            );
            const instance = new removeServiceClass({
                product_id: payload.product_id
            });

            await instance.removeProduct();
        }

        /* ------------------- Update product ------------------- */
        const category =
            payload.product_new_category || payload.product_category;
        const serviceClass = await getProduct(category);
        const instance = new serviceClass(payload);

        return instance.updateProduct();
    };

    /* ------------------- Remove product ------------------- */
    public static removeProduct = async (
        id: serviceTypes.product.arguments.RemoveProduct
    ) => {
        const type: modelTypes.product.ProductList | undefined =
            await findProductCategoryById(id);
        if (!type) throw new NotFoundErrorResponse('Product not found!');

        const serviceClass = await getProduct(type);
        if (!serviceClass)
            throw new NotFoundErrorResponse('Not found product service');

        const instance = new serviceClass({ product_id: id });

        return await instance.removeProduct();
    };
}
