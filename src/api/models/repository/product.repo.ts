import { getProductModel } from '../../../configs/product.config';
import ErrorResponse from '../../response/error.response';
import { ProductListKey } from '../../types/models/product';
import { importProductModel } from '../../utils/product.util';
import productModel from '../product.model';

export const deleteProductById = async (id: string) => {
    const product = await productModel.findByIdAndDelete(id);
    if (!product) throw new ErrorResponse(400, 'Delete product failed!');

    const productChildModel = getProductModel(product.product_category);
    await productChildModel.findByIdAndDelete(product._id);
};
