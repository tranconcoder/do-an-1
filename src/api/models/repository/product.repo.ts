import mongoose from 'mongoose';
import { getProductModel } from '../../../configs/product.config';
import ErrorResponse, {
    NotFoundErrorResponse
} from '../../response/error.response';
import { productModel } from '../product.model';

export const deleteProductById = async (id: string) => {
    const product = await productModel.findByIdAndDelete(id);
    if (!product) throw new ErrorResponse(400, 'Delete product failed!');

    const productChildModel = await getProductModel(product.product_category);
    if (!productChildModel) {
        throw new NotFoundErrorResponse('Not found product!');
    }

    return await productChildModel.deleteOne({
        _id: new mongoose.Types.ObjectId(id)
    });
};

/* ------------ Get all product id as string ------------ */
export const findProductIdStrList = async () => {
    return (
        await productModel.aggregate().project({
            _id: { $toString: '$_id' }
        })
    ).map((x: { _id: string }) => x._id);
};
