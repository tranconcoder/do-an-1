import mongoose from 'mongoose';
import { phoneModel } from '../../models/product.model';
import { Product } from '.';
import { BadRequestErrorResponse } from '../../response/error.response';

export default class Phone extends Product {
    /* ------------------- Create product ------------------- */
    public async createProduct() {
        // set id manually for product before create
        super.setProductId(new mongoose.Types.ObjectId().toString());

        return await Promise.all([
            super.createProduct(),
            phoneModel.create({
                ...this.product_attributes,
                _id: super.getProductId(),
                product_shop: super.getProductShop()
            })
        ])
            .then(([product]) => product)
            .catch((error) => {
                const message = error?.messgae || 'Save product failed';
                throw new BadRequestErrorResponse(message);
            });
    }

    /* ------------------- Update product ------------------- */
    public async updateProduct() {
        const set = {};

        return await Promise.all([
            /* ------------------- Update product ------------------- */
            super.updateProduct(),

            /* ---------------- Update phone product ---------------- */
            phoneModel.updateOne(
                { _id: super.getProductId() },
                { $set: this.product_attributes }
            )
        ]).then(([product, attributes]) => {
            console.log(product, attributes);

            return product;
        });
    }

    /* ------------------- Remove product ------------------- */
    public async removeProduct() {
        await Promise.all([
            super.removeProduct(),
            phoneModel.deleteOne({ _id: super.getProductId() })
        ]).catch((error) => {
            const message = error?.messgae || 'Remove product failed';
            throw new BadRequestErrorResponse(message);
        });
    }
}
