import Joi from 'joi';
import _ from 'lodash';

/* ====================================================== */
/*                      TOKEN PAYLOAD SCHEMA              */
/* ====================================================== */
const jwtPayload: joiTypes.utils.ConvertObjectToJoiType<joiTypes.jwt.definition.JwtPayload> =
    {
        id: Joi.string().required(),
        role: Joi.string().required(),
        exp: Joi.number().required(),
        iat: Joi.number().required()
    };

export const jwtPayloadSignSchema = Joi.object<
    joiTypes.jwt.definition.JwtPayloadSign,
    true
>(_.pick(jwtPayload, ['id', 'role']));

export const jwtPayloadSchema = Joi.object<
    joiTypes.jwt.definition.JwtPayload,
    true
>(jwtPayload).unknown(true);
