import Joi from 'joi';
import _ from 'lodash';

/* ====================================================== */
/*                       USER SCHEMA                      */
/* ====================================================== */
const user: joiTypes.utils.ConvertObjectToJoiType<joiTypes.auth.UserSchema> = {
    email: Joi.string().email().required(),
    fullName: Joi.string().required().min(4).max(30),
    phoneNumber: Joi.string()
        .required()
        .regex(/(\+84|84|0[3|5|7|8|9])+([0-9]{8})\b/),
    password: Joi.string()
        .required()
        .regex(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
        ),
    role: Joi.string().required()
};

/* ====================================================== */
/*                      LOGIN SCHEMA                      */
/* ====================================================== */
export const loginSchema = Joi.object<joiTypes.auth.LoginSchema, true>(
    _.pick(user, ['phoneNumber', 'password'])
);

/* ====================================================== */
/*                      SIGNUP SCHEMA                     */
/* ====================================================== */
export const signUpSchema = Joi.object<joiTypes.auth.SignUpSchema, true>(
    _.pick(user, ['email', 'fullName', 'password', 'phoneNumber'])
);

/* ====================================================== */
/*                      NEW TOKEN SCHEMA                  */
/* ====================================================== */
export const newTokenSchema = Joi.object<joiTypes.auth.NewTokenSchema>({
    refreshToken: Joi.string().required()
});
