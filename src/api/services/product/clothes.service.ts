import { Product } from '.';
import { clothesModel, ClothesSchema } from '../../models/product.model';
import { BadRequestErrorResponse } from '../../response/error.response';

export default class Clothes extends Product<ClothesSchema> {
    public async createProduct() {
        const product = await super.createProduct();
        if (!product) throw new BadRequestErrorResponse('Save product failed');

        const clothes = await clothesModel.create({
            ...this.product_attributes,
            _id: product._id,
            product_shop: product.product_shop
        });
        if (!clothes) throw new BadRequestErrorResponse('Save clothes failed');

        return product;
    }

    public async removeProduct(id: string) {
        await Promise.all([
            super.removeProduct(id),
            clothesModel.deleteOne({ _id: id })
        ]);
    }
}
