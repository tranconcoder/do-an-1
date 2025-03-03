import type { UnionToPartialIntersection } from '../../types/common';
import mongoose from 'mongoose';
import { getProductModel } from '../../../configs/product.config';
import ErrorResponse from '../../response/error.response';
import { modelTypes } from '../../types/models/porduct';
import { importProductModel } from '../../utils/product.util';
import { productModel } from '../product.model';

export const deleteProductById = async (id: string) => {
    const product = await productModel.findByIdAndDelete(id);
    if (!product) throw new ErrorResponse(400, 'Delete product failed!');

    const productChildModel = await getProductModel(product.product_category);
    productChildModel?.phone_battery;

    const a = productChildModel as UnionToPartialIntersection<
        typeof productChildModel
    >;
};
