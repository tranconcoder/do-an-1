export interface ProductList {
    product: typeof Product;
    phone: typeof Phone;
    clothes: typeof Clothes;
}

export type ProductListKey = keyof ProductList;
export type ProductListType = ProductList[ProductListKey];
