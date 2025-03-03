import type { JwtPayload } from 'jwt-decode';
import { modelTypes } from './models/product';
import { Document } from 'mongoose';
import { ConvertObjectIdToString } from './mongoose';

export namespace joiTypes {
    module auth {
        interface LoginSchema {
            phoneNumber: string;
            password: string;
        }

        interface SignUpSchema extends LoginSchema {
            email: string;
            fullName: string;
        }

        interface NewTokenSchema {
            refreshToken: string;
        }
    }

    module jwt {
        interface JwtPayloadSign {
            userId: string;
            role: string;
        }

        interface JwtPayloadSignWithHeader
            extends JwtPayloadSign,
                Required<Pick<JwtPayload, 'iat' | 'exp'>> {}
    }

    module product {
        /* ====================================================== */
        /*                       DEFINITION                       */
        /* ====================================================== */
        interface PhoneSchema
            extends ConvertObjectIdToString<modelTypes.product.PhoneSchema> {}

        interface ClothesSchema
            extends ConvertObjectIdToString<modelTypes.product.ClothesSchema> {}

        /* ====================================================== */
        /*                         CREATE                         */
        /* ====================================================== */
        interface CreateProductSchema
            extends ConvertObjectIdToString<modelTypes.product.ProductSchema> {}

        interface DeleteProductSchema
            extends Pick<modelTypes.product.ProductSchema, 'product_category'> {
            _id: string;
        }
    }

    module user {
        interface UserSchema {}
    }
}
