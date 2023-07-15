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

describe('POST /auth/login', () => {
    const urlAPI: string = '/auth/login';
    
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
        const data = {
            password: TESTING.PASSWORD
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

    test(`When email is number`, async () => {
        const data = {
            email: 123,
            password: TESTING.PASSWORD
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
            email: null,
            password: TESTING.PASSWORD
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
            email: {},
            password: TESTING.PASSWORD
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
            email: true,
            password: TESTING.PASSWORD
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
            email: [123],
            password: TESTING.PASSWORD
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
            email: new Date(),
            password: TESTING.PASSWORD
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
            email: '',
            password: TESTING.PASSWORD
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
            email: 'Eduardo',
            password: TESTING.PASSWORD
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
    
    test(`When password is undefined`, async () => {
        const data = {
            email: TESTING.EMAIL
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

    test(`When password is number`, async () => {
        const data = {
            email: TESTING.EMAIL,
            password: 123
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

    test(`When password is null`, async () => {
        const data = {
            email: TESTING.EMAIL,
            password: null
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

    test(`When password is json`, async () => {
        const data = {
            email: TESTING.EMAIL,
            password: {}
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

    test(`When password is boolean`, async () => {
        const data = {
            email: TESTING.EMAIL,
            password: false
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

    test(`When password is array`, async () => {
        const data = {
            email: TESTING.EMAIL,
            password: []
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

    test(`When password is Date`, async () => {
        const data = {
            email: TESTING.EMAIL,
            password: new Date()
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
    
    test(`When password is empty`, async () => {
        const data = {
            email: TESTING.EMAIL,
            password: ''
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
    
    test(`When password has empty spaces`, async () => {
        const data = {
            email: TESTING.EMAIL,
            password: 'Hola 10$$#'
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

    test(`When the password is less than 7 characters`, async () => {
        const data = {
            email: TESTING.EMAIL,
            password: 'Hola'
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

    test(`When the password has more than 13 characters`, async () => {
        const data = {
            email: TESTING.EMAIL,
            password: 'HolaHolaHolaHola'
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

    test(`When the password is not valid`, async () => {
        const data = {
            email: TESTING.EMAIL,
            password: 'Hola10ZI'
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
            email: 'mailnotfound@gmail.com',
            password: TESTING.PASSWORD
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

    test(`When email is correct, but password is incorrect`, async () => {
        const data = {
            email: TESTING.EMAIL,
            password: 'Hola123M%'
        };
        const res = await server.post(urlAPI).send(data);
        const { body } = res;
        expect(body.statusCode).toBeDefined();
        expect(body.statusCode).toBe(STATUS_CODES.UNAUTHORIZED);
        expect(body.error).toBeDefined();
        expect(body.error).toEqual(STATUS_CODES_NAME.UNAUTHORIZED);
        expect(body.message).toBeDefined();
        expect(body.message).toEqual(expect.any(String));
        expect(res.status).toBe(STATUS_CODES.UNAUTHORIZED);
    });

    test(`When all info is correct`, async () => {
        const data = {
            email: TESTING.EMAIL,
            password: TESTING.PASSWORD
        };
        const res = await server.post(urlAPI).send(data);
        const { body } = res;
        expect(body.statusCode).toBeDefined();
        expect(body.statusCode).toBe(STATUS_CODES.OK);
        expect(body.token).toBeDefined();
        expect(body.token).toEqual(expect.any(String));
        expect(body.refreshToken).toBeDefined();
        expect(body.refreshToken).toEqual(expect.any(String));
        expect(res.status).toBe(STATUS_CODES.OK);
    });
});