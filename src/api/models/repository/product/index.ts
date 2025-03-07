import mongoose from 'mongoose';
import { getProductModel } from '../../../../configs/product.config';
import { ITEM_PER_PAGE } from '../../../../configs/server.config';
import ErrorResponse, {
    NotFoundErrorResponse
} from '../../../response/error.response';
import { productModel } from '../../product.model';

// Common
export const queryPaginate = async (query: object, page: number) => {
    if (!page || page < 1)
        throw new NotFoundErrorResponse('Current page invalid!');

    return await productModel
        .find(query)
        .sort({ created_at: -1 })
        .skip((page - 1) * ITEM_PER_PAGE)
        .limit(ITEM_PER_PAGE)
        .lean();
};

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

/* -------------- Find all product by shop -------------- */
export const findAllProductByShop = async ({
    currentPage,
    product_shop
}: serviceTypes.product.arguments.GetAllProductByShop) => {
    return queryPaginate({ product_shop }, currentPage);
};

/* ------------- Find all product draft by shop ------------- */
export const findAllProductDraftByShop = async ({
    product_shop,
    currentPage
}: serviceTypes.product.arguments.GetAllProductDraftByShop) => {
    const query: Partial<modelTypes.product.ProductSchema> = {
        product_shop,
        is_draft: true
    };

    return queryPaginate(query, currentPage);
};

/* ------------ Find all product publish by shop ------------ */
export const findAllProductPublishByShop = async ({
    product_shop,
    currentPage
}: serviceTypes.product.arguments.GetAllProductPublishByShop) => {
    const query: Partial<modelTypes.product.ProductSchema> = {
        product_shop,
        is_publish: true
    };

    return queryPaginate(query, currentPage);
};

/* ------------ Find all product undraft by shop ------------ */
export const findAllProductUndraftByShop = async ({
    product_shop,
    currentPage
}: serviceTypes.product.arguments.GetAllProductUndraftByShop) => {
    const query: Partial<modelTypes.product.ProductSchema> = {
        product_shop,
        is_draft: false
    };

    return queryPaginate(query, currentPage);
};

/* ------------ Find all product unpublish by shop ------------ */
export const findAllProductUnpublishByShop = async ({
    product_shop,
    currentPage
}: serviceTypes.product.arguments.GetAllProductUnpublishByShop) => {
    const query: Partial<modelTypes.product.ProductSchema> = {
        product_shop,
        is_publish: false
    };

    return queryPaginate(query, currentPage);
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

export const findOneProduct = async (
    payload: Partial<modelTypes.product.ProductSchema>
) => {
    return await productModel.findOne(payload);
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

/* ----------------- Delete one product ----------------- */
export const deleteOneProduct = async (
    payload: Partial<modelTypes.product.ProductSchema>
) => {
    const { deletedCount } = await productModel.deleteOne(payload);
    return deletedCount;
};
