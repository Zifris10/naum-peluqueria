import request from 'supertest';
import dotenv from 'dotenv';
dotenv.config();
import { TESTING, STATUS_CODES, STATUS_CODES_NAME } from '../../src/helpers';
const server = request(TESTING.HOST);

describe('POST /auth/forgot-password', () => {
    const urlAPI: string = '/auth/forgot-password';
    
    test(`When we don't send information`, async () => {
        const res = await server.post(urlAPI);
        const { body } = res;
        expect(body.statusCode).toBeDefined();
        expect(body.statusCode).toBe(STATUS_CODES.BAD_REQUEST);
        expect(body.error).toBeDefined();
        expect(body.error).toEqual(STATUS_CODES_NAME.BAD_REQUEST);
        expect(body.message).toBeDefined();
        expect(body.message).toEqual(expect.any(String));
        expect(res.status).toBe(STATUS_CODES.BAD_REQUEST);
    });
    
    test(`When email is undefined`, async () => {
        const data = {};
        const res = await server.post(urlAPI).send(data);
        const { body } = res;
        expect(body.statusCode).toBeDefined();
        expect(body.statusCode).toBe(STATUS_CODES.BAD_REQUEST);
        expect(body.error).toBeDefined();
        expect(body.error).toEqual(STATUS_CODES_NAME.BAD_REQUEST);
        expect(body.message).toBeDefined();
        expect(body.message).toEqual(expect.any(String));
        expect(res.status).toBe(STATUS_CODES.BAD_REQUEST);
    });

    test(`When email is number`, async () => {
        const data = {
            email: 123
        };
        const res = await server.post(urlAPI).send(data);
        const { body } = res;
        expect(body.statusCode).toBeDefined();
        expect(body.statusCode).toBe(STATUS_CODES.BAD_REQUEST);
        expect(body.error).toBeDefined();
        expect(body.error).toEqual(STATUS_CODES_NAME.BAD_REQUEST);
        expect(body.message).toBeDefined();
        expect(body.message).toEqual(expect.any(String));
        expect(res.status).toBe(STATUS_CODES.BAD_REQUEST);
    });

    test(`When email is null`, async () => {
        const data = {
            email: null
        };
        const res = await server.post(urlAPI).send(data);
        const { body } = res;
        expect(body.statusCode).toBeDefined();
        expect(body.statusCode).toBe(STATUS_CODES.BAD_REQUEST);
        expect(body.error).toBeDefined();
        expect(body.error).toEqual(STATUS_CODES_NAME.BAD_REQUEST);
        expect(body.message).toBeDefined();
        expect(body.message).toEqual(expect.any(String));
        expect(res.status).toBe(STATUS_CODES.BAD_REQUEST);
    });

    test(`When email is json`, async () => {
        const data = {
            email: {}
        };
        const res = await server.post(urlAPI).send(data);
        const { body } = res;
        expect(body.statusCode).toBeDefined();
        expect(body.statusCode).toBe(STATUS_CODES.BAD_REQUEST);
        expect(body.error).toBeDefined();
        expect(body.error).toEqual(STATUS_CODES_NAME.BAD_REQUEST);
        expect(body.message).toBeDefined();
        expect(body.message).toEqual(expect.any(String));
        expect(res.status).toBe(STATUS_CODES.BAD_REQUEST);
    });

    test(`When email is boolean`, async () => {
        const data = {
            email: true
        };
        const res = await server.post(urlAPI).send(data);
        const { body } = res;
        expect(body.statusCode).toBeDefined();
        expect(body.statusCode).toBe(STATUS_CODES.BAD_REQUEST);
        expect(body.error).toBeDefined();
        expect(body.error).toEqual(STATUS_CODES_NAME.BAD_REQUEST);
        expect(body.message).toBeDefined();
        expect(body.message).toEqual(expect.any(String));
        expect(res.status).toBe(STATUS_CODES.BAD_REQUEST);
    });

    test(`When email is array`, async () => {
        const data = {
            email: [123]
        };
        const res = await server.post(urlAPI).send(data);
        const { body } = res;
        expect(body.statusCode).toBeDefined();
        expect(body.statusCode).toBe(STATUS_CODES.BAD_REQUEST);
        expect(body.error).toBeDefined();
        expect(body.error).toEqual(STATUS_CODES_NAME.BAD_REQUEST);
        expect(body.message).toBeDefined();
        expect(body.message).toEqual(expect.any(String));
        expect(res.status).toBe(STATUS_CODES.BAD_REQUEST);
    });

    test(`When email is Date`, async () => {
        const data = {
            email: new Date()
        };
        const res = await server.post(urlAPI).send(data);
        const { body } = res;
        expect(body.statusCode).toBeDefined();
        expect(body.statusCode).toBe(STATUS_CODES.BAD_REQUEST);
        expect(body.error).toBeDefined();
        expect(body.error).toEqual(STATUS_CODES_NAME.BAD_REQUEST);
        expect(body.message).toBeDefined();
        expect(body.message).toEqual(expect.any(String));
        expect(res.status).toBe(STATUS_CODES.BAD_REQUEST);
    });

    test(`When email is empty`, async () => {
        const data = {
            email: ''
        };
        const res = await server.post(urlAPI).send(data);
        const { body } = res;
        expect(body.statusCode).toBeDefined();
        expect(body.statusCode).toBe(STATUS_CODES.BAD_REQUEST);
        expect(body.error).toBeDefined();
        expect(body.error).toEqual(STATUS_CODES_NAME.BAD_REQUEST);
        expect(body.message).toBeDefined();
        expect(body.message).toEqual(expect.any(String));
        expect(res.status).toBe(STATUS_CODES.BAD_REQUEST);
    });

    test(`When email is not valid`, async () => {
        const data = {
            email: 'Eduardo'
        };
        const res = await server.post(urlAPI).send(data);
        const { body } = res;
        expect(body.statusCode).toBeDefined();
        expect(body.statusCode).toBe(STATUS_CODES.BAD_REQUEST);
        expect(body.error).toBeDefined();
        expect(body.error).toEqual(STATUS_CODES_NAME.BAD_REQUEST);
        expect(body.message).toBeDefined();
        expect(body.message).toEqual(expect.any(String));
        expect(res.status).toBe(STATUS_CODES.BAD_REQUEST);
    });

    test(`When email not found`, async () => {
        const data = {
            email: 'mailnotfound@gmail.com'
        };
        const res = await server.post(urlAPI).send(data);
        const { body } = res;
        expect(body.statusCode).toBeDefined();
        expect(body.statusCode).toBe(STATUS_CODES.NOT_FOUND);
        expect(body.error).toBeDefined();
        expect(body.error).toEqual(STATUS_CODES_NAME.NOT_FOUND);
        expect(body.message).toBeDefined();
        expect(body.message).toEqual(expect.any(String));
        expect(res.status).toBe(STATUS_CODES.NOT_FOUND);
    });

    test(`When email is correct`, async () => {
        const data = {
            email: TESTING.EMAIL
        };
        const res = await server.post(urlAPI).send(data);
        const { body } = res;
        expect(body.statusCode).toBeDefined();
        expect(body.statusCode).toBe(STATUS_CODES.OK);
        expect(res.status).toBe(STATUS_CODES.OK);
    });
});