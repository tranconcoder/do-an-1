import mongoose from 'mongoose';
import { Product } from '.';
import { clothesModel } from '../../models/product.model';
import { BadRequestErrorResponse } from '../../response/error.response';

export default class Clothes extends Product {
    /* ------------------- Create product ------------------- */
    public async createProduct() {
        // set id manually for product before create
        super.setId(new mongoose.Types.ObjectId());

        return await Promise.all([
            super.createProduct(),
            clothesModel.create({
                ...this.product_attributes,
                _id: super.getId(),
                product_shop: super.getProductShop()
            })
        ])
            .then(([product]) => product)
            .catch(() => {
                throw new BadRequestErrorResponse('Save product failed');
            });
    }

    /* ------------------- Update product ------------------- */
    public async updateProduct() {
        return await Promise.all([
            super.updateProduct(),
            clothesModel.updateOne(
                { _id: super.getId() },
                { $set: this.product_attributes }
            )
        ]).then(([product]) => product);
    }

    /* ------------------- Remove product ------------------- */
    public async removeProduct() {
        await Promise.all([
            super.removeProduct(),
            clothesModel.deleteOne({ _id: super.getId() })
        ]);
    }
}
