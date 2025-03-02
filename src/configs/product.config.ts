import { ProductList } from '../api/types/product';
import { importProductService } from '../api/utils/product.util';

export const getProductList = async (): Promise<ProductList> => {
    return {
        Clothes: await importProductService('clothes'),
        Phone: await importProductService('phone')
    };
};
