import Joi, { ObjectSchema } from 'joi';

//const string: Joi.StringSchema<string> = Joi.string().required();
const uuid: Joi.StringSchema<string> = Joi.string().uuid().required();
const alpha: Joi.StringSchema<string> = Joi.string().regex(/^[A-Za-záéíóúÁÉÍÓÚ\s]*$/).required();
//const alphanumeric: Joi.StringSchema<string> = Joi.string().regex(/^[A-Za-z0-9áéíóúÁÉÍÓÚ\s]*$/).required();
const email: Joi.StringSchema<string> = Joi.string().email().required();
const password: Joi.StringSchema<string> = Joi.string().min(8).max(12).regex(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,12}$/).required();

// AUTH
export const schemaAuthLogin: ObjectSchema = Joi.object({
    email: email.messages({
        'string.email': `Oops, lo sentimos pero el email no tiene un formato válido.`,
        'string.base': `Oops, lo sentimos pero el email no tiene un formato válido.`,
        'string.empty': `Oops, lo sentimos pero el email no puede estar vacío.`,
        'any.required': `Oops, lo sentimos pero el email es requerido.`
    }),
    password: password.messages({
        'string.min': `Oops, lo sentimos pero la contraseña es debe tener mínimo 8 caracteres.`,
        'string.max': `Oops, lo sentimos pero la contraseña es debe tener máximo 12 caracteres.`,
        'string.empty': `Oops, lo sentimos pero la contraseña no puede estar vacía.`,
        'string.base': `Oops, lo sentimos pero la contraseña no es válida.`,
        'string.pattern.base': `Oops, lo sentimos pero la contraseña debe contener mínimo 1 letra mayúscula, 1 letra minúscula, 1 número y un símbolo, además de no tener espacios.`,
        'any.required': `Oops, lo sentimos pero la contraseña es requerida.`,
    })
});

export const schemaAuthForgotPassword: ObjectSchema = Joi.object({
    email: email.messages({
        'string.email': `Oops, lo sentimos pero el email no tiene un formato válido.`,
        'string.base': `Oops, lo sentimos pero el email no tiene un formato válido.`,
        'string.empty': `Oops, lo sentimos pero el email no puede estar vacío.`,
        'any.required': `Oops, lo sentimos pero el email es requerido.`
    })
});

export const schemaAuthUpdatePassword: ObjectSchema = Joi.object({
    password: password.messages({
        'string.min': `Oops, lo sentimos pero la contraseña es debe tener mínimo 8 caracteres.`,
        'string.max': `Oops, lo sentimos pero la contraseña es debe tener máximo 12 caracteres.`,
        'string.empty': `Oops, lo sentimos pero la contraseña no puede estar vacía.`,
        'string.base': `Oops, lo sentimos pero la contraseña no es válida.`,
        'string.pattern.base': `Oops, lo sentimos pero la contraseña debe contener mínimo 1 letra mayúscula, 1 letra minúscula, 1 número y un símbolo, además de no tener espacios.`,
        'any.required': `Oops, lo sentimos pero la contraseña es requerida.`,
    }),
    userID: uuid.messages({
        'string.empty': `Oops, lo sentimos pero el id del usuario no puede estar vacío.`,
        'string.guid': `Oops, lo sentimos pero el id del usuario debe ser de tipo uuid.`,
        'string.base': `Oops, lo sentimos pero el id del usuario debe ser una cadena de texto.`,
        'any.required': `Oops, lo sentimos pero el id del usuario es requerido.`
    })
});

// USERS
export const schemaUsersUpdateProfile: ObjectSchema = Joi.object({
    name: alpha.min(5).max(50).messages({
        'string.min': `Oops, lo sentimos pero el nombre debe tener mínimo 5 caracteres.`,
        'string.max': `Oops, lo sentimos pero el nombre debe tener máximo 50 caracteres.`,
        'string.base': `Oops, lo sentimos pero el nombre debe ser una cadena de texto.`,
        'string.empty': `Oops, lo sentimos pero el nombre no puede estar vacío.`,
        'string.pattern.base': `Oops, lo sentimos pero el nombre solo permite letras.`,
        'any.required': `Oops, lo sentimos pero el nombre es requerido.`
    }),
    email: email.messages({
        'string.email': `Oops, lo sentimos pero el email no tiene un formato válido.`,
        'string.base': `Oops, lo sentimos pero el email no tiene un formato válido.`,
        'string.empty': `Oops, lo sentimos pero el email no puede estar vacío.`,
        'any.required': `Oops, lo sentimos pero el email es requerido.`
    })
});