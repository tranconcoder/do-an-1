import type { Document } from 'mongoose';

/* ----------------------- Service ---------------------- */
import Clothes from '../api/services/product/clothes.service';
import Phone from '../api/services/product/phone.service';

/* ------------------------ Utils ----------------------- */
import {
    importProductModel,
    importProductService
} from '../api/utils/product.util';
import { UnionToPartialIntersection } from '../api/types/common';
import { CategoryEnum } from '../api/enums/product.enum';

type GetKeyType<T, K> = K extends keyof T ? T[K] : any;

const services = {
    Clothes: importProductService(CategoryEnum.Clothes) as Promise<
        typeof Clothes
    >,
    Phone: importProductService(CategoryEnum.Phone) as Promise<typeof Phone>
} as const;

const models = {
    Clothes: importProductModel(CategoryEnum.Clothes) as Promise<
        modelTypes.product.ClothesSchema & Document
    >,
    Phone: importProductModel(CategoryEnum.Phone) as Promise<
        modelTypes.product.PhoneSchema & Document
    >
};

export const getProduct = async <T extends modelTypes.product.ProductListKey>(
    category: T
) => {
    return (await services[category]) as GetKeyType<typeof services, T>;
};

export const getProductModel = async <
    K extends modelTypes.product.ProductListKey
>(
    key: K
) => {
    return (await models[key]) as UnionToPartialIntersection<
        GetKeyType<typeof models, K>
    >;
};
