import * as Joi from '@hapi/joi';
import 'joi-extract-type';

/* ====================================================== */
/*                      TOKEN PAYLOAD SCHEMA              */
/* ====================================================== */
export const jwtPayloadSchema = Joi.object({
    userId: Joi.string().required(),
    role: Joi.string().required()
}).unknown(true);

export const jwtPayloadWithHeaderSchema = jwtPayloadSchema
    .keys({
        iat: Joi.number().required(),
        exp: Joi.number().required()
    })
    .unknown(true);

export type JwtPayloadSchema = Joi.extractType<typeof jwtPayloadSchema>;
export type JwtPayloadWithHeaderSchema = Joi.extractType<
    typeof jwtPayloadWithHeaderSchema
>;
