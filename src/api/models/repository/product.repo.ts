import mongoose from 'mongoose';
import { getProductModel } from '../../../configs/product.config';
import ErrorResponse, {
    NotFoundErrorResponse
} from '../../response/error.response';
import { productModel } from '../product.model';

/* ====================================================== */
/*                        FIND ALL                        */
/* ====================================================== */
/* ------------ Find all product id as string ------------ */
export const findProductIdStrList = async () => {
    return (
        await productModel.aggregate().project({
            _id: { $toString: '$_id' }
        })
    ).map((x: { _id: string }) => x._id);
};

export const findAllProductByShop = async (productShop: string) => {
    return await productModel.find({
        product_shop: productShop
    });
};

/* ====================================================== */
/*                        FIND ONE                        */
/* ====================================================== */
/* ------------- Find product by shop and id ------------ */
export const findProductByShopAndId = async (
    payload: Pick<
        modelTypes.product.ProductSchema<true>,
        'product_shop' | '_id'
    >
) => {
    return await productModel.findOne(payload);
};

/* ----------------- Find product by id ----------------- */
export const findProductById = async (id: string) => {
    return await productModel.findById(id);
};

/* ------------- Find product category by id ------------ */
export const findProductCategoryById = async (id: string) => {
    return await findProductById(id).then((x) => x?.product_category);
};

/* ====================================================== */
/*                         DELETE                         */
/* ====================================================== */
/* ---------------- Delete product by id ---------------- */
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
