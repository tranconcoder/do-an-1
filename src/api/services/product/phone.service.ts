import mongoose from 'mongoose';
import { phoneModel } from '../../models/product.model';
import { Product } from '.';
import { BadRequestErrorResponse } from '../../response/error.response';

export default class Phone extends Product {
    public async createProduct() {
        // set id manually for product before create
        super.setId(new mongoose.Types.ObjectId());

        return await Promise.all([
            super.createProduct(),
            phoneModel.create({
                ...this.product_attributes,
                _id: super.getId(),
                product_shop: super.getProductShop()
            })
        ])
            .then(([product]) => product)
            .catch((error) => {
                const message = error?.messgae || 'Save product failed';
                throw new BadRequestErrorResponse(message);
            });
    }

    public async removeProduct() {
        await Promise.all([
            super.removeProduct(),
            phoneModel.deleteOne({ _id: super.getId() })
        ]).catch((error) => {
            const message = error?.messgae || 'Remove product failed';
            throw new BadRequestErrorResponse(message);
        });
    }
}
