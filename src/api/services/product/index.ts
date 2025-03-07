/* ----------------------- Configs ---------------------- */
import { getProduct } from '../../../configs/product.config';
import {
    BadRequestErrorResponse,
    ForbiddenErrorResponse,
    NotFoundErrorResponse
} from '../../response/error.response';
import {
    findAllProductByShop,
    findOneProduct,
    findProductById,
    findProductCategoryById
} from '../../models/repository/product';

/* ====================================================== */
/*                         FACTORY                        */
/* ====================================================== */
export default class ProductFactory {
    /* ====================================================== */
    /*                     CREATE PRODUCT                     */
    /* ====================================================== */
    public static createProduct = async <
        K extends modelTypes.product.ProductList
    >(
        type: K,
        payload: serviceTypes.product.arguments.CreateProduct
    ) => {
        const serviceClass = await getProduct<K>(type);
        if (!serviceClass)
            throw new NotFoundErrorResponse('Not found product service');

        const instance = new serviceClass(payload as any);

        return await instance.createProduct();
    };

    /* ====================================================== */
    /*                       GET PRODUCT                      */
    /* ====================================================== */
    /* --------------- Get all product by shop -------------- */
    public static getAllProductByShop = async ({
        ...payload
    }: serviceTypes.product.arguments.GetAllProductByShop) => {
        return await findAllProductByShop(payload);
    };

    public static getAllDraftByShop = async (
        payload: serviceTypes.product.arguments.GetAllDraftByShop
    ) => {
        const query: Partial<modelTypes.product.ProductSchema> = {
            ...payload,
            is_draft: true,
        };
    };

    /* ====================================================== */
    /*                     UPDATE PRODUCT                     */
    /* ====================================================== */
    public static updateProduct = async ({
        product_id: _id,
        ...payload
    }: serviceTypes.product.arguments.UpdateProduct) => {
        const product = await findOneProduct({
            _id,
            product_shop: payload.product_shop,
            product_category: payload.product_category
        });
        if (!product) throw new NotFoundErrorResponse('Not found product!');

        /* ----------------- Remove old category ---------------- */
        /* ---------------- When changed category --------------- */
        if (
            payload.product_new_category &&
            payload.product_category !== payload.product_new_category
        ) {
            const removeServiceClass = await getProduct(
                payload.product_category
            );
            const instance = new removeServiceClass({ _id });

            await instance.removeProduct();
        }

        /* ------------------- Update product ------------------- */
        const category =
            payload.product_new_category || payload.product_category;
        const serviceClass = await getProduct(category);
        const instance = new serviceClass({ ...payload, _id });

        return instance.updateProduct();
    };

    /* ====================================================== */
    /*                     REMOVE PRODUCT                     */
    /* ====================================================== */
    public static removeProduct = async (
        id: serviceTypes.product.arguments.RemoveProduct,
        userId: string
    ) => {
        /* ------------------ Get product type ------------------ */
        const type: modelTypes.product.ProductList | undefined =
            await findProductCategoryById(id);
        if (!type) throw new NotFoundErrorResponse('Product not found!');

        /* ----------------- Init service class ----------------- */
        const serviceClass = await getProduct(type);
        if (!serviceClass)
            throw new NotFoundErrorResponse('Not found product service');

        const instance = new serviceClass({
            _id: id,
            product_shop: userId
        });

        /* -------------------- Handle delete ------------------- */
        const deletedCount = await instance.removeProduct();
        if (deletedCount < 2) {
            throw new BadRequestErrorResponse('Remove product failed');
        }
    };
}
