import {
    clothesModel,
    ClothesSchema,
    phoneModel,
    PhoneSchema
} from '../api/models/product.model';
import type { ProductListKey } from '../api/types/models/product';

import Clothes from '../api/services/product/clothes.service';
import { Phone } from '../api/services/product/phone.service';
import {
    importProductModel,
    importProductService
} from '../api/utils/product.util';

type GetKeyType<T, K> = K extends keyof T ? T[K] : any;

export const getProduct = async <T extends ProductListKey>(category: T) => {
    const services = {
        Clothes: importProductService('clothes') as Promise<typeof Clothes>,
        Phone: importProductService('phone') as Promise<typeof Phone>
    } as const;

    return services[category] as any as Promise<GetKeyType<typeof services, T>>;
};

export const getProductModel = async <K extends ProductListKey>(key: K) => {
    const models = {
        Clothes: importProductModel('Clothes') as Promise<ClothesSchema>,
        Phone: importProductModel('Phone') as Promise<PhoneSchema>
    };

    return models[key] as any as GetKeyType<typeof models, K>;
};
