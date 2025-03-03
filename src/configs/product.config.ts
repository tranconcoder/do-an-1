import type { Document } from 'mongoose';

/* ----------------------- Service ---------------------- */
import Clothes from '../api/services/product/clothes.service';
import { Phone } from '../api/services/product/phone.service';

/* ------------------------ Utils ----------------------- */
import {
    importProductModel,
    importProductService
} from '../api/utils/product.util';
import { modelTypes, ProductListKey } from '../api/types/models/porduct';
import { UnionToPartialIntersection } from '../api/types/common';

type GetKeyType<T, K> = K extends keyof T ? T[K] : any;

const services = {
    Clothes: importProductService(
        modelTypes.Product.CategoryEnum.Clothes
    ) as Promise<typeof Clothes>,
    Phone: importProductService(
        modelTypes.Product.CategoryEnum.Phone
    ) as Promise<typeof Phone>
} as const;

const models = {
    Clothes: importProductModel(
        modelTypes.Product.CategoryEnum.Clothes
    ) as Promise<modelTypes.Product.ClothesSchema & Document>,
    Phone: importProductModel(modelTypes.Product.CategoryEnum.Phone) as Promise<
        modelTypes.Product.PhoneSchema & Document
    >
};

export const getProduct = async <T extends ProductListKey>(category: T) => {
    return (await services[category]) as GetKeyType<typeof services, T>;
};

export const getProductModel = async <K extends ProductListKey>(key: K) => {
    return (await models[key]) as UnionToPartialIntersection<
        GetKeyType<typeof models, K>
    >;
};
