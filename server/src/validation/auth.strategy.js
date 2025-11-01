import { registerSchema, loginSchema } from './auth.schema.js';

const strategies = {
    register: registerSchema,
    login: loginSchema,
};

export const getSchema = (tipo) => {
    const schema = strategies[tipo];
    if (!schema) throw new Error(`No hay esquema para: ${tipo}`);
    return schema;
};