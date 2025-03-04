import Joi from 'joi';

/* ====================================================== */
/*                      TOKEN PAYLOAD SCHEMA              */
/* ====================================================== */
const jwtPayload = {
    userId: Joi.string().required(),
    role: Joi.string().required()
};
export const jwtPayloadSchema = Joi.object<joiTypes.jwt.JwtPayloadSign, true>(
    jwtPayload
).unknown(true);

export const jwtPayloadWithHeaderSchema = Joi.object<
    joiTypes.jwt.JwtPayloadSignWithHeader,
    true
>({
    ...jwtPayload,
    iat: Joi.number().required(),
    exp: Joi.number().required()
}).unknown(true);
