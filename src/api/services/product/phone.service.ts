import mongoose from 'mongoose';
import { Product } from '.';
import { phoneModel } from '../../models/product.model';
import { BadRequestErrorResponse } from '../../response/error.response';
import { modelTypes } from '../../types/models/product';

export default class Phone extends Product<modelTypes.product.PhoneSchema> {
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
                console.log(error);
                throw new BadRequestErrorResponse('Save product failed');
            });
    }

    public async removeProduct() {
        await Promise.all([
            super.removeProduct(),
            phoneModel.deleteOne({ _id: super.getId() })
        ]);

        throw new Error();
    }
}
