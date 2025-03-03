import Joi from 'joi';
import { joiTypes } from '../../types/joi';

/* ====================================================== */
/*                      LOGIN SCHEMA                      */
/* ====================================================== */
const login = {
    phoneNumber: Joi.string()
        .required()
        .regex(/(\+84|84|0[3|5|7|8|9])+([0-9]{8})\b/),
    password: Joi.string()
        .required()
        .regex(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
        )
};
export const loginSchema = Joi.object<joiTypes.auth.LoginSchema>({
    ...login
});

/* ====================================================== */
/*                      SIGNUP SCHEMA                     */
/* ====================================================== */
export const signUpSchema = Joi.object<joiTypes.auth.SignUpSchema>({
    ...login,
    email: Joi.string().email().required(),
    fullName: Joi.string().required().min(4).max(30)
});

/* ====================================================== */
/*                      NEW TOKEN SCHEMA                  */
/* ====================================================== */
export const newTokenSchema = Joi.object<joiTypes.auth.NewTokenSchema>({
    refreshToken: Joi.string().required()
});
