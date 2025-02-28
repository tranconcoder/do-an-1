import mongoose from 'mongoose';
import productModel, { phoneModel } from '../models/product.model';
import { ProductList, ProductListKey, ProductListType } from '../types/product';

abstract class Factory<T = any> {
    public constructor(
        public product_shop: mongoose.Types.ObjectId,
        public product_name: string,
        public product_cost: number,
        public product_thumb: string,
        public product_quantity: number,
        public product_description: string,
        public product_category: string,
        public product_rating: number,
        public product_attributes: any
    ) {}
    public abstract createProduct(): Promise<any extends infer U ? U : unknown>;
}

const getService = (type: ProductListKey): ProductListType => {
    const productList: ProductList = {
        product: Product,
        phone: Phone,
        clothes: Clothes
    };
    return productList[type];
};

export default class ProductFactory {
    public static async createProduct(
        type: ProductListKey,
        payload: Omit<
            Factory<any extends infer U ? U : unknown>,
            'createProduct'
        >
    ): Promise<Factory> {
        const ServiceClass = getService(type);

        if (!ServiceClass) throw new Error('Invalid type');

        return new ServiceClass(
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
    }
}

class Product extends Factory {
    public async createProduct() {
        return await productModel.create(this);
    }
}

class Phone extends Factory {
    public async createProduct() {
        return await phoneModel.create(this.product_attributes);
    }
}

class Clothes extends Factory {
    public async createProduct() {
        return await productModel.create(this.product_attributes);
    }
}

/* ====================================================== */
/*                         EXAMPLE                        */
/* ====================================================== */
ProductFactory.createProduct('phone', {
    product_shop: new mongoose.Types.ObjectId(),
    product_name: 'iPhone 12',
    product_cost: 1000,
    product_thumb: 'https://example.com/iphone-12.jpg',
    product_quantity: 10,
    product_description: 'The latest iPhone',
    product_category: 'Phone',
    product_rating: 5,
    product_attributes: {
        memory: '256GB',
        color: 'Black'
    }
})
    .then((product) => {
        console.log(product.product_attributes);
    })
    .catch((error) => {
        console.error(error);
    });
