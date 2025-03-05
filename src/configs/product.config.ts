/* ----------------------- Service ---------------------- */
import Clothes from '../api/services/product/clothes.service';
import Phone from '../api/services/product/phone.service';

/* ------------------------ Utils ----------------------- */
import {
    importProductModel,
    importProductService
} from '../api/utils/product.util';
import { CategoryEnum } from '../api/enums/product.enum';

type GetKeyType<T, K> = K extends keyof T ? T[K] : any;

const services = {
    clothes: importProductService(CategoryEnum.Clothes) as Promise<
        typeof Clothes
    >,
    phone: importProductService(CategoryEnum.Phone) as Promise<typeof Phone>
} as const;

const models = {
    clothes: importProductModel(CategoryEnum.Clothes) as Promise<
        modelTypes.product.ClothesSchema<true>
    >,
    phone: importProductModel(CategoryEnum.Phone) as Promise<
        modelTypes.product.PhoneSchema<true>
    >
};

export const getProduct = async <T extends modelTypes.product.ProductList>(
    category: T
) => {
    return (await services[category]) as GetKeyType<typeof services, T>;
};

export const getProductModel = async <K extends modelTypes.product.ProductList>(
    key: K
) => {
    return (await models[key]) as commonTypes.utils.UnionToPartialIntersection<
        GetKeyType<typeof models, K>
    >;
};
