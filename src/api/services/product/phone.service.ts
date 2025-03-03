import mongoose from 'mongoose';
import { Product } from '.';
import { phoneModel, PhoneSchema } from '../../models/product.model';
import { BadRequestErrorResponse } from '../../response/error.response';

export class Phone extends Product<PhoneSchema> {
    public async createProduct() {
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
            .catch(() => {
                throw new BadRequestErrorResponse('Save product failed');
            });
    }

    public async removeProduct(id: string) {
        await Promise.all([
            super.removeProduct(id),
            phoneModel.deleteOne({ _id: id })
        ]);
    }
}
