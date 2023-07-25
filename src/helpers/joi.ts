import Joi, { ObjectSchema } from 'joi';
import { InventoryInterface } from '../interfaces';

const phoneNumber: Joi.StringSchema<string> = Joi.string().regex(/^[0-9]{10}$/);
const uuid: Joi.StringSchema<string> = Joi.string().uuid().required();
const number: Joi.NumberSchema<number> = Joi.number().integer().required();
const string: Joi.StringSchema<string> = Joi.string().required();
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

// APPOINTMENTS
export const schemaAppointmentID: ObjectSchema = Joi.object({
    appointmentID: uuid.messages({
        'string.guid': `Oops, lo sentimos pero el id de la cita debe ser de tipo uuid.`
    })
});

export const schemaCreateAppointment: ObjectSchema = Joi.object({
    startDate: string.min(5).max(20).messages({
        'string.min': `Oops, lo sentimos pero la fecha de inicio debe tener mínimo 5 caracteres.`,
        'string.max': `Oops, lo sentimos pero la fecha de inicio debe tener máximo 20 caracteres.`,
        'string.base': `Oops, lo sentimos pero la fecha de inicio debe ser una cadena de texto.`,
        'string.empty': `Oops, lo sentimos pero la fecha de inicio no puede estar vacío.`,
        'any.required': `Oops, lo sentimos pero la fecha de inicio es requerido.`
    }),
    startTime: string.min(3).max(10).messages({
        'string.min': `Oops, lo sentimos pero la hora de inicio debe tener mínimo 3 caracteres.`,
        'string.max': `Oops, lo sentimos pero la hora de inicio debe tener máximo 10 caracteres.`,
        'string.base': `Oops, lo sentimos pero la hora de inicio debe ser una cadena de texto.`,
        'string.empty': `Oops, lo sentimos pero la hora de inicio no puede estar vacío.`,
        'any.required': `Oops, lo sentimos pero la hora de inicio es requerido.`
    }),
    endTime: string.min(3).max(10).messages({
        'string.min': `Oops, lo sentimos pero la hora de fin debe tener mínimo 3 caracteres.`,
        'string.max': `Oops, lo sentimos pero la hora de fin debe tener máximo 10 caracteres.`,
        'string.base': `Oops, lo sentimos pero la hora de fin debe ser una cadena de texto.`,
        'string.empty': `Oops, lo sentimos pero la hora de fin no puede estar vacío.`,
        'any.required': `Oops, lo sentimos pero la hora de fin es requerido.`
    }),
    name: string.min(5).max(100).messages({
        'string.min': `Oops, lo sentimos pero el nombre debe tener mínimo 5 caracteres.`,
        'string.max': `Oops, lo sentimos pero el nombre debe tener máximo 100 caracteres.`,
        'string.base': `Oops, lo sentimos pero el nombre debe ser una cadena de texto.`,
        'string.empty': `Oops, lo sentimos pero el nombre no puede estar vacío.`,
        'any.required': `Oops, lo sentimos pero el nombre es requerido.`
    }),
    phone: phoneNumber.required().allow('').messages({
        'string.base': `El teléfono debe ser una cadena de texto y solo contener números.`,
        'any.only': `El teléfono debe ser una cadena de texto y solo contener números.`,
        'string.pattern.base': `El teléfono debe contener 10 dígitos.`,
        'any.required': `Oops, lo sentimos pero el teléfono es requerido.`
    })
});

export const schemaCompleteAppointment: ObjectSchema = Joi.object({
    price: number.positive().allow(0).messages({
        'number.positive': `Oops, lo sentimos pero el precio debe ser un número positivo.`,
        'number.base': `Oops, lo sentimos pero el precio debe ser un número.`,
        'number.integer': `Oops, lo sentimos pero el precio debe ser un número entero.`,
        'any.required': `Oops, lo sentimos pero el precio es requerido.`
    })
});

// INVENTORY
export const schemaInventoryID: ObjectSchema = Joi.object({
    inventoryID: uuid.messages({
        'string.guid': `Oops, lo sentimos pero el id del inventario debe ser de tipo uuid.`
    })
});

export const schemaCreateInventory: ObjectSchema<InventoryInterface> = Joi.object({
    name: string.min(5).max(100).messages({
        'string.min': `Oops, lo sentimos pero el nombre debe tener mínimo 5 caracteres.`,
        'string.max': `Oops, lo sentimos pero el nombre debe tener máximo 100 caracteres.`,
        'string.base': `Oops, lo sentimos pero el nombre debe ser una cadena de texto.`,
        'string.empty': `Oops, lo sentimos pero el nombre no puede estar vacío.`,
        'any.required': `Oops, lo sentimos pero el nombre es requerido.`
    }),
    price: number.positive().allow(0).messages({
        'number.positive': `Oops, lo sentimos pero el precio debe ser un número positivo.`,
        'number.base': `Oops, lo sentimos pero el precio debe ser un número.`,
        'number.integer': `Oops, lo sentimos pero el precio debe ser un número entero.`,
        'any.required': `Oops, lo sentimos pero el precio es requerido.`
    })
});

export const schemaUpdateInventory: ObjectSchema = Joi.object({
    fieldName: string.valid('name', 'price').messages({
        'any.required': `Oops, lo sentimos pero el nombre del campo es requerido.`,
        'any.only': `Oops, lo sentimos pero el nombre del campo solo debe ser nombre o precio.`
    }),
    value: Joi.alternatives().try(number.positive().allow(0), string.min(5).max(100)).required().messages({
        'string.min': `Oops, lo sentimos pero el nombre debe tener mínimo 5 caracteres.`,
        'string.max': `Oops, lo sentimos pero el nombre debe tener máximo 100 caracteres.`,
        'string.base': `Oops, lo sentimos pero el nombre debe ser una cadena de texto.`,
        'string.empty': `Oops, lo sentimos pero el nombre no puede estar vacío.`,
        'any.required': `Oops, lo sentimos pero el nombre o precio es requerido.`,
        'number.positive': `Oops, lo sentimos pero el precio debe ser un número positivo.`,
        'number.base': `Oops, lo sentimos pero el precio debe ser un número.`,
        'number.integer': `Oops, lo sentimos pero el precio debe ser un número entero.`,
        'alternatives.types': `Oops, lo sentimos pero el value debe ser un número entero o un texto.`
    })
});