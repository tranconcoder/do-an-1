import type { JwtPayload } from 'jwt-decode';
import mongoose, { Document } from 'mongoose';
import { ConvertObjectIdToString } from './mongoose';

declare global {
    namespace joiTypes {
        module auth {
            interface UserSchema extends modelTypes.auth.UserSchema {}

            interface LoginSchema
                extends Pick<UserSchema, 'phoneNumber' | 'password'> {}

            interface SignUpSchema
                extends ConvertObjectIdToString<
                    Omit<UserSchema, 'dateOfBirth'>
                > {}

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
                extends ConvertObjectIdToString<
                    Omit<modelTypes.product.PhoneSchema, 'product_shop'>
                > {}

            interface ClothesSchema
                extends ConvertObjectIdToString<
                    Omit<modelTypes.product.ClothesSchema, 'product_shop'>
                > {}

            /* ====================================================== */
            /*                         CREATE                         */
            /* ====================================================== */
            interface CreateProductSchema
                extends ConvertObjectIdToString<
                    Omit<
                        modelTypes.product.ProductSchema,
                        'product_shop' | 'product_rating_avg' | 'product_slug'
                    >
                > {}

            interface DeleteProductSchema
                extends Pick<
                    modelTypes.product.ProductSchema,
                    'product_category'
                > {
                product_id: string;
            }
        }
    }
}
