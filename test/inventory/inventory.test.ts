import request from 'supertest';
import dotenv from 'dotenv';
dotenv.config();
import { TESTING, STATUS_CODES, STATUS_CODES_NAME } from '../../src/helpers';
import { InventoryModel } from '../../src/models';
const server = request(TESTING.HOST);
let tokenNaum: string = '';
let inventoryID: string = '';

beforeAll(async () => {
    const dataLogin = {
        email: TESTING.EMAIL,
        password: TESTING.PASSWORD
    };
    const getToken = await server.post('/auth/login').send(dataLogin);
    tokenNaum = getToken.body.token;
});

afterAll(async () => {
    const where = {
        where: {
            id: inventoryID
        },
        force: true
    };
    await InventoryModel.destroy(where);
});

describe('POST /inventory/', () => {
    const urlAPI: string = '/inventory/';

    test(`When we don't have a token`, async () => {
        const data = {
            name: 'Hola mundo',
            price: 400
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

    test(`When token is null`, async () => {
        const data = {
            name: 'Hola mundo',
            price: 400
        };
        const res = await server.post(urlAPI).set({ Authorization: null }).send(data);
        const { body } = res;
        expect(body.statusCode).toBeDefined();
        expect(body.statusCode).toBe(STATUS_CODES.UNAUTHORIZED);
        expect(body.error).toBeDefined();
        expect(body.error).toEqual(STATUS_CODES_NAME.UNAUTHORIZED);
        expect(body.message).toBeDefined();
        expect(body.message).toEqual(expect.any(String));
        expect(res.status).toBe(STATUS_CODES.UNAUTHORIZED);
    });
    
    test(`When token is json`, async () => {
        const data = {
            name: 'Hola mundo',
            price: 400
        };
        const res = await server.post(urlAPI).set({ Authorization: {} }).send(data);
        const { body } = res;
        expect(body.statusCode).toBeDefined();
        expect(body.statusCode).toBe(STATUS_CODES.UNAUTHORIZED);
        expect(body.error).toBeDefined();
        expect(body.error).toEqual(STATUS_CODES_NAME.UNAUTHORIZED);
        expect(body.message).toBeDefined();
        expect(body.message).toEqual(expect.any(String));
        expect(res.status).toBe(STATUS_CODES.UNAUTHORIZED);
    });
    
    test(`When token is number`, async () => {
        const data = {
            name: 'Hola mundo',
            price: 400
        };
        const res = await server.post(urlAPI).set({ Authorization: 123 }).send(data);
        const { body } = res;
        expect(body.statusCode).toBeDefined();
        expect(body.statusCode).toBe(STATUS_CODES.UNAUTHORIZED);
        expect(body.error).toBeDefined();
        expect(body.error).toEqual(STATUS_CODES_NAME.UNAUTHORIZED);
        expect(body.message).toBeDefined();
        expect(body.message).toEqual(expect.any(String));
        expect(res.status).toBe(STATUS_CODES.UNAUTHORIZED);
    });
    
    test(`When token is array`, async () => {
        const data = {
            name: 'Hola mundo',
            price: 400
        };
        const res = await server.post(urlAPI).set({ Authorization: [] }).send(data);
        const { body } = res;
        expect(body.statusCode).toBeDefined();
        expect(body.statusCode).toBe(STATUS_CODES.UNAUTHORIZED);
        expect(body.error).toBeDefined();
        expect(body.error).toEqual(STATUS_CODES_NAME.UNAUTHORIZED);
        expect(body.message).toBeDefined();
        expect(body.message).toEqual(expect.any(String));
        expect(res.status).toBe(STATUS_CODES.UNAUTHORIZED);
    });
    
    test(`When token is string`, async () => {
        const data = {
            name: 'Hola mundo',
            price: 400
        };
        const res = await server.post(urlAPI).set({ Authorization: 'hola' }).send(data);
        const { body } = res;
        expect(body.statusCode).toBeDefined();
        expect(body.statusCode).toBe(STATUS_CODES.UNAUTHORIZED);
        expect(body.error).toBeDefined();
        expect(body.error).toEqual(STATUS_CODES_NAME.UNAUTHORIZED);
        expect(body.message).toBeDefined();
        expect(body.message).toEqual(expect.any(String));
        expect(res.status).toBe(STATUS_CODES.UNAUTHORIZED);
    });
    
    test(`When token is boolean`, async () => {
        const data = {
            name: 'Hola mundo',
            price: 400
        };
        const res = await server.post(urlAPI).set({ Authorization: true }).send(data);
        const { body } = res;
        expect(body.statusCode).toBeDefined();
        expect(body.statusCode).toBe(STATUS_CODES.UNAUTHORIZED);
        expect(body.error).toBeDefined();
        expect(body.error).toEqual(STATUS_CODES_NAME.UNAUTHORIZED);
        expect(body.message).toBeDefined();
        expect(body.message).toEqual(expect.any(String));
        expect(res.status).toBe(STATUS_CODES.UNAUTHORIZED);
    });

    test(`When token is Date`, async () => {
        const data = {
            name: 'Hola mundo',
            price: 400
        };
        const res = await server.post(urlAPI).set({ Authorization: new Date() }).send(data);
        const { body } = res;
        expect(body.statusCode).toBeDefined();
        expect(body.statusCode).toBe(STATUS_CODES.UNAUTHORIZED);
        expect(body.error).toBeDefined();
        expect(body.error).toEqual(STATUS_CODES_NAME.UNAUTHORIZED);
        expect(body.message).toBeDefined();
        expect(body.message).toEqual(expect.any(String));
        expect(res.status).toBe(STATUS_CODES.UNAUTHORIZED);
    });
    
    test(`When token is not valid`, async () => {
        const data = {
            name: 'Hola mundo',
            price: 400
        };
        const res = await server.post(urlAPI).set({ Authorization: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZFVzZXIiOiIybmxJWm41djQiLCJpYXQiOjE2NzMzNjg4MzksImV4cCI6MTY3MzQxMjAzOX0.ZVo8zfhJj0meY9wVDk22WRQr' }).send(data);
        const { body } = res;
        expect(body.statusCode).toBeDefined();
        expect(body.statusCode).toBe(STATUS_CODES.UNAUTHORIZED);
        expect(body.error).toBeDefined();
        expect(body.error).toEqual(STATUS_CODES_NAME.UNAUTHORIZED);
        expect(body.message).toBeDefined();
        expect(body.message).toEqual(expect.any(String));
        expect(res.status).toBe(STATUS_CODES.UNAUTHORIZED);
    });
    
    test(`When token is expired`, async () => {
        const data = {
            name: 'Hola mundo',
            price: 400
        };
        const res = await server.post(urlAPI).set({ Authorization: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZFVzZXIiOiIybmxJWm41djQiLCJpYXQiOjE2NzMzNjg4MzksImV4cCI6MTY3MzQxMjAzOX0.ZVo8zfhJj0meY9wVDk22WRQrUuMpxHn0VrjkawqbT5w' }).send(data);
        const { body } = res;
        expect(body.statusCode).toBeDefined();
        expect(body.statusCode).toBe(STATUS_CODES.UNAUTHORIZED);
        expect(body.error).toBeDefined();
        expect(body.error).toEqual(STATUS_CODES_NAME.UNAUTHORIZED);
        expect(body.message).toBeDefined();
        expect(body.message).toEqual(expect.any(String));
        expect(res.status).toBe(STATUS_CODES.UNAUTHORIZED);
    });

    test(`When we don't send information`, async () => {
        const res = await server.post(urlAPI).set({ Authorization: tokenNaum });
        const { body } = res;
        expect(body.statusCode).toBeDefined();
        expect(body.statusCode).toBe(STATUS_CODES.BAD_REQUEST);
        expect(body.error).toBeDefined();
        expect(body.error).toEqual(STATUS_CODES_NAME.BAD_REQUEST);
        expect(body.message).toBeDefined();
        expect(body.message).toEqual(expect.any(String));
        expect(res.status).toBe(STATUS_CODES.BAD_REQUEST);
    });

    test(`When name is undefined`, async () => {
        const data = {
            price: 400
        };
        const res = await server.post(urlAPI).send(data).set({ Authorization: tokenNaum });
        const { body } = res;
        expect(body.statusCode).toBeDefined();
        expect(body.statusCode).toBe(STATUS_CODES.BAD_REQUEST);
        expect(body.error).toBeDefined();
        expect(body.error).toEqual(STATUS_CODES_NAME.BAD_REQUEST);
        expect(body.message).toBeDefined();
        expect(body.message).toEqual(expect.any(String));
        expect(res.status).toBe(STATUS_CODES.BAD_REQUEST);
    });

    test(`When name is number`, async () => {
        const data = {
            name: 123,
            price: 400
        };
        const res = await server.post(urlAPI).send(data).set({ Authorization: tokenNaum });
        const { body } = res;
        expect(body.statusCode).toBeDefined();
        expect(body.statusCode).toBe(STATUS_CODES.BAD_REQUEST);
        expect(body.error).toBeDefined();
        expect(body.error).toEqual(STATUS_CODES_NAME.BAD_REQUEST);
        expect(body.message).toBeDefined();
        expect(body.message).toEqual(expect.any(String));
        expect(res.status).toBe(STATUS_CODES.BAD_REQUEST);
    });

    test(`When name is null`, async () => {
        const data = {
            name: null,
            price: 400
        };
        const res = await server.post(urlAPI).send(data).set({ Authorization: tokenNaum });
        const { body } = res;
        expect(body.statusCode).toBeDefined();
        expect(body.statusCode).toBe(STATUS_CODES.BAD_REQUEST);
        expect(body.error).toBeDefined();
        expect(body.error).toEqual(STATUS_CODES_NAME.BAD_REQUEST);
        expect(body.message).toBeDefined();
        expect(body.message).toEqual(expect.any(String));
        expect(res.status).toBe(STATUS_CODES.BAD_REQUEST);
    });

    test(`When name is json`, async () => {
        const data = {
            name: {},
            price: 400
        };
        const res = await server.post(urlAPI).send(data).set({ Authorization: tokenNaum });
        const { body } = res;
        expect(body.statusCode).toBeDefined();
        expect(body.statusCode).toBe(STATUS_CODES.BAD_REQUEST);
        expect(body.error).toBeDefined();
        expect(body.error).toEqual(STATUS_CODES_NAME.BAD_REQUEST);
        expect(body.message).toBeDefined();
        expect(body.message).toEqual(expect.any(String));
        expect(res.status).toBe(STATUS_CODES.BAD_REQUEST);
    });

    test(`When name is array`, async () => {
        const data = {
            name: [],
            price: 400
        };
        const res = await server.post(urlAPI).send(data).set({ Authorization: tokenNaum });
        const { body } = res;
        expect(body.statusCode).toBeDefined();
        expect(body.statusCode).toBe(STATUS_CODES.BAD_REQUEST);
        expect(body.error).toBeDefined();
        expect(body.error).toEqual(STATUS_CODES_NAME.BAD_REQUEST);
        expect(body.message).toBeDefined();
        expect(body.message).toEqual(expect.any(String));
        expect(res.status).toBe(STATUS_CODES.BAD_REQUEST);
    });

    test(`When name is boolean`, async () => {
        const data = {
            name: true,
            price: 400
        };
        const res = await server.post(urlAPI).send(data).set({ Authorization: tokenNaum });
        const { body } = res;
        expect(body.statusCode).toBeDefined();
        expect(body.statusCode).toBe(STATUS_CODES.BAD_REQUEST);
        expect(body.error).toBeDefined();
        expect(body.error).toEqual(STATUS_CODES_NAME.BAD_REQUEST);
        expect(body.message).toBeDefined();
        expect(body.message).toEqual(expect.any(String));
        expect(res.status).toBe(STATUS_CODES.BAD_REQUEST);
    });

    test(`When name is empty`, async () => {
        const data = {
            name: '',
            price: 400
        };
        const res = await server.post(urlAPI).send(data).set({ Authorization: tokenNaum });
        const { body } = res;
        expect(body.statusCode).toBeDefined();
        expect(body.statusCode).toBe(STATUS_CODES.BAD_REQUEST);
        expect(body.error).toBeDefined();
        expect(body.error).toEqual(STATUS_CODES_NAME.BAD_REQUEST);
        expect(body.message).toBeDefined();
        expect(body.message).toEqual(expect.any(String));
        expect(res.status).toBe(STATUS_CODES.BAD_REQUEST);
    });

    test(`When price is undefined`, async () => {
        const data = {
            name: 'Hola mundo'
        };
        const res = await server.post(urlAPI).send(data).set({ Authorization: tokenNaum });
        const { body } = res;
        expect(body.statusCode).toBeDefined();
        expect(body.statusCode).toBe(STATUS_CODES.BAD_REQUEST);
        expect(body.error).toBeDefined();
        expect(body.error).toEqual(STATUS_CODES_NAME.BAD_REQUEST);
        expect(body.message).toBeDefined();
        expect(body.message).toEqual(expect.any(String));
        expect(res.status).toBe(STATUS_CODES.BAD_REQUEST);
    });

    test(`When price is null`, async () => {
        const data = {
            name: 'Hola mundo',
            price: null
        };
        const res = await server.post(urlAPI).send(data).set({ Authorization: tokenNaum });
        const { body } = res;
        expect(body.statusCode).toBeDefined();
        expect(body.statusCode).toBe(STATUS_CODES.BAD_REQUEST);
        expect(body.error).toBeDefined();
        expect(body.error).toEqual(STATUS_CODES_NAME.BAD_REQUEST);
        expect(body.message).toBeDefined();
        expect(body.message).toEqual(expect.any(String));
        expect(res.status).toBe(STATUS_CODES.BAD_REQUEST);
    });

    test(`When price is json`, async () => {
        const data = {
            name: 'Hola mundo',
            price: {}
        };
        const res = await server.post(urlAPI).send(data).set({ Authorization: tokenNaum });
        const { body } = res;
        expect(body.statusCode).toBeDefined();
        expect(body.statusCode).toBe(STATUS_CODES.BAD_REQUEST);
        expect(body.error).toBeDefined();
        expect(body.error).toEqual(STATUS_CODES_NAME.BAD_REQUEST);
        expect(body.message).toBeDefined();
        expect(body.message).toEqual(expect.any(String));
        expect(res.status).toBe(STATUS_CODES.BAD_REQUEST);
    });

    test(`When price is array`, async () => {
        const data = {
            name: 'Hola mundo',
            price: []
        };
        const res = await server.post(urlAPI).send(data).set({ Authorization: tokenNaum });
        const { body } = res;
        expect(body.statusCode).toBeDefined();
        expect(body.statusCode).toBe(STATUS_CODES.BAD_REQUEST);
        expect(body.error).toBeDefined();
        expect(body.error).toEqual(STATUS_CODES_NAME.BAD_REQUEST);
        expect(body.message).toBeDefined();
        expect(body.message).toEqual(expect.any(String));
        expect(res.status).toBe(STATUS_CODES.BAD_REQUEST);
    });

    test(`When price is boolean`, async () => {
        const data = {
            name: 'Hola mundo',
            price: false
        };
        const res = await server.post(urlAPI).send(data).set({ Authorization: tokenNaum });
        const { body } = res;
        expect(body.statusCode).toBeDefined();
        expect(body.statusCode).toBe(STATUS_CODES.BAD_REQUEST);
        expect(body.error).toBeDefined();
        expect(body.error).toEqual(STATUS_CODES_NAME.BAD_REQUEST);
        expect(body.message).toBeDefined();
        expect(body.message).toEqual(expect.any(String));
        expect(res.status).toBe(STATUS_CODES.BAD_REQUEST);
    });

    test(`When price is Date`, async () => {
        const data = {
            name: 'Hola mundo',
            price: new Date()
        };
        const res = await server.post(urlAPI).send(data).set({ Authorization: tokenNaum });
        const { body } = res;
        expect(body.statusCode).toBeDefined();
        expect(body.statusCode).toBe(STATUS_CODES.BAD_REQUEST);
        expect(body.error).toBeDefined();
        expect(body.error).toEqual(STATUS_CODES_NAME.BAD_REQUEST);
        expect(body.message).toBeDefined();
        expect(body.message).toEqual(expect.any(String));
        expect(res.status).toBe(STATUS_CODES.BAD_REQUEST);
    });

    test(`When price is empty`, async () => {
        const data = {
            name: 'Hola mundo',
            price: ''
        };
        const res = await server.post(urlAPI).send(data).set({ Authorization: tokenNaum });
        const { body } = res;
        expect(body.statusCode).toBeDefined();
        expect(body.statusCode).toBe(STATUS_CODES.BAD_REQUEST);
        expect(body.error).toBeDefined();
        expect(body.error).toEqual(STATUS_CODES_NAME.BAD_REQUEST);
        expect(body.message).toBeDefined();
        expect(body.message).toEqual(expect.any(String));
        expect(res.status).toBe(STATUS_CODES.BAD_REQUEST);
    });

    test(`When price is a negative number`, async () => {
        const data = {
            name: 'Hola mundo',
            price: -400
        };
        const res = await server.post(urlAPI).send(data).set({ Authorization: tokenNaum });
        const { body } = res;
        expect(body.statusCode).toBeDefined();
        expect(body.statusCode).toBe(STATUS_CODES.BAD_REQUEST);
        expect(body.error).toBeDefined();
        expect(body.error).toEqual(STATUS_CODES_NAME.BAD_REQUEST);
        expect(body.message).toBeDefined();
        expect(body.message).toEqual(expect.any(String));
        expect(res.status).toBe(STATUS_CODES.BAD_REQUEST);
    });

    test(`When all info is valid`, async () => {
        const data = {
            name: 'Hola mundo',
            price: 400
        };
        const res = await server.post(urlAPI).send(data).set({ Authorization: tokenNaum });
        const { body } = res;
        expect(body.statusCode).toBeDefined();
        expect(body.statusCode).toBe(STATUS_CODES.OK);
        expect(body.data).toBeDefined();
        expect(body.data).toEqual({
            id: expect.any(String),
            deleted: false,
            name: expect.any(String),
            price: expect.any(Number),
            createdBy: expect.any(String),
            updatedAt: expect.any(String),
            createdAt: expect.any(String),
            deletedBy: null
        });
        inventoryID = body.data.id;
        expect(res.status).toBe(STATUS_CODES.OK);
    });
});

describe('GET /inventory/', () => {
    const urlAPI: string = '/inventory/';

    test(`When we don't have a token`, async () => {
        const res = await server.get(urlAPI);
        const { body } = res;
        expect(body.statusCode).toBeDefined();
        expect(body.statusCode).toBe(STATUS_CODES.UNAUTHORIZED);
        expect(body.error).toBeDefined();
        expect(body.error).toEqual(STATUS_CODES_NAME.UNAUTHORIZED);
        expect(body.message).toBeDefined();
        expect(body.message).toEqual(expect.any(String));
        expect(res.status).toBe(STATUS_CODES.UNAUTHORIZED);
    });

    test(`When token is null`, async () => {
        const res = await server.get(urlAPI).set({ Authorization: null });
        const { body } = res;
        expect(body.statusCode).toBeDefined();
        expect(body.statusCode).toBe(STATUS_CODES.UNAUTHORIZED);
        expect(body.error).toBeDefined();
        expect(body.error).toEqual(STATUS_CODES_NAME.UNAUTHORIZED);
        expect(body.message).toBeDefined();
        expect(body.message).toEqual(expect.any(String));
        expect(res.status).toBe(STATUS_CODES.UNAUTHORIZED);
    });
    
    test(`When token is json`, async () => {
        const res = await server.get(urlAPI).set({ Authorization: {} });
        const { body } = res;
        expect(body.statusCode).toBeDefined();
        expect(body.statusCode).toBe(STATUS_CODES.UNAUTHORIZED);
        expect(body.error).toBeDefined();
        expect(body.error).toEqual(STATUS_CODES_NAME.UNAUTHORIZED);
        expect(body.message).toBeDefined();
        expect(body.message).toEqual(expect.any(String));
        expect(res.status).toBe(STATUS_CODES.UNAUTHORIZED);
    });
    
    test(`When token is number`, async () => {
        const res = await server.get(urlAPI).set({ Authorization: 123 });
        const { body } = res;
        expect(body.statusCode).toBeDefined();
        expect(body.statusCode).toBe(STATUS_CODES.UNAUTHORIZED);
        expect(body.error).toBeDefined();
        expect(body.error).toEqual(STATUS_CODES_NAME.UNAUTHORIZED);
        expect(body.message).toBeDefined();
        expect(body.message).toEqual(expect.any(String));
        expect(res.status).toBe(STATUS_CODES.UNAUTHORIZED);
    });
    
    test(`When token is array`, async () => {
        const res = await server.get(urlAPI).set({ Authorization: [] });
        const { body } = res;
        expect(body.statusCode).toBeDefined();
        expect(body.statusCode).toBe(STATUS_CODES.UNAUTHORIZED);
        expect(body.error).toBeDefined();
        expect(body.error).toEqual(STATUS_CODES_NAME.UNAUTHORIZED);
        expect(body.message).toBeDefined();
        expect(body.message).toEqual(expect.any(String));
        expect(res.status).toBe(STATUS_CODES.UNAUTHORIZED);
    });
    
    test(`When token is string`, async () => {
        const res = await server.get(urlAPI).set({ Authorization: 'hola' });
        const { body } = res;
        expect(body.statusCode).toBeDefined();
        expect(body.statusCode).toBe(STATUS_CODES.UNAUTHORIZED);
        expect(body.error).toBeDefined();
        expect(body.error).toEqual(STATUS_CODES_NAME.UNAUTHORIZED);
        expect(body.message).toBeDefined();
        expect(body.message).toEqual(expect.any(String));
        expect(res.status).toBe(STATUS_CODES.UNAUTHORIZED);
    });
    
    test(`When token is boolean`, async () => {
        const res = await server.get(urlAPI).set({ Authorization: true });
        const { body } = res;
        expect(body.statusCode).toBeDefined();
        expect(body.statusCode).toBe(STATUS_CODES.UNAUTHORIZED);
        expect(body.error).toBeDefined();
        expect(body.error).toEqual(STATUS_CODES_NAME.UNAUTHORIZED);
        expect(body.message).toBeDefined();
        expect(body.message).toEqual(expect.any(String));
        expect(res.status).toBe(STATUS_CODES.UNAUTHORIZED);
    });

    test(`When token is Date`, async () => {
        const res = await server.get(urlAPI).set({ Authorization: new Date() });
        const { body } = res;
        expect(body.statusCode).toBeDefined();
        expect(body.statusCode).toBe(STATUS_CODES.UNAUTHORIZED);
        expect(body.error).toBeDefined();
        expect(body.error).toEqual(STATUS_CODES_NAME.UNAUTHORIZED);
        expect(body.message).toBeDefined();
        expect(body.message).toEqual(expect.any(String));
        expect(res.status).toBe(STATUS_CODES.UNAUTHORIZED);
    });
    
    test(`When token is not valid`, async () => {
        const res = await server.get(urlAPI).set({ Authorization: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZFVzZXIiOiIybmxJWm41djQiLCJpYXQiOjE2NzMzNjg4MzksImV4cCI6MTY3MzQxMjAzOX0.ZVo8zfhJj0meY9wVDk22WRQr' });
        const { body } = res;
        expect(body.statusCode).toBeDefined();
        expect(body.statusCode).toBe(STATUS_CODES.UNAUTHORIZED);
        expect(body.error).toBeDefined();
        expect(body.error).toEqual(STATUS_CODES_NAME.UNAUTHORIZED);
        expect(body.message).toBeDefined();
        expect(body.message).toEqual(expect.any(String));
        expect(res.status).toBe(STATUS_CODES.UNAUTHORIZED);
    });
    
    test(`When token is expired`, async () => {
        const res = await server.get(urlAPI).set({ Authorization: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZFVzZXIiOiIybmxJWm41djQiLCJpYXQiOjE2NzMzNjg4MzksImV4cCI6MTY3MzQxMjAzOX0.ZVo8zfhJj0meY9wVDk22WRQrUuMpxHn0VrjkawqbT5w' });
        const { body } = res;
        expect(body.statusCode).toBeDefined();
        expect(body.statusCode).toBe(STATUS_CODES.UNAUTHORIZED);
        expect(body.error).toBeDefined();
        expect(body.error).toEqual(STATUS_CODES_NAME.UNAUTHORIZED);
        expect(body.message).toBeDefined();
        expect(body.message).toEqual(expect.any(String));
        expect(res.status).toBe(STATUS_CODES.UNAUTHORIZED);
    });

    test(`When token is valid`, async () => {
        const res = await server.get(urlAPI).set({ Authorization: tokenNaum });
        const { body } = res;
        expect(body.statusCode).toBeDefined();
        expect(body.statusCode).toBe(STATUS_CODES.OK);
        expect(body.html).toBeDefined();
        expect(body.html).toEqual(expect.any(String));
    });
});

describe('DELETE /inventory/:inventoryID', () => {
    const urlAPI: string = '/inventory/';

    test(`When inventoryID is not uuid`, async () => {
        const res = await server.delete(`${urlAPI}uuid`).set({ Authorization: tokenNaum });
        const { body } = res;
        expect(body.statusCode).toBeDefined();
        expect(body.statusCode).toBe(STATUS_CODES.BAD_REQUEST);
        expect(body.error).toBeDefined();
        expect(body.error).toEqual(STATUS_CODES_NAME.BAD_REQUEST);
        expect(body.message).toBeDefined();
        expect(body.message).toEqual(expect.any(String));
        expect(res.status).toBe(STATUS_CODES.BAD_REQUEST);
    });

    test(`When inventoryID is not found`, async () => {
        const res = await server.delete(`${urlAPI}${TESTING.UUID}`).set({ Authorization: tokenNaum });
        const { body } = res;
        expect(body.statusCode).toBeDefined();
        expect(body.statusCode).toBe(STATUS_CODES.NOT_FOUND);
        expect(body.error).toBeDefined();
        expect(body.error).toEqual(STATUS_CODES_NAME.NOT_FOUND);
        expect(body.message).toBeDefined();
        expect(body.message).toEqual(expect.any(String));
        expect(res.status).toBe(STATUS_CODES.NOT_FOUND);
    });

    test(`When we don't have a token`, async () => {
        const res = await server.delete(`${urlAPI}${TESTING.UUID}`);
        const { body } = res;
        expect(body.statusCode).toBeDefined();
        expect(body.statusCode).toBe(STATUS_CODES.UNAUTHORIZED);
        expect(body.error).toBeDefined();
        expect(body.error).toEqual(STATUS_CODES_NAME.UNAUTHORIZED);
        expect(body.message).toBeDefined();
        expect(body.message).toEqual(expect.any(String));
        expect(res.status).toBe(STATUS_CODES.UNAUTHORIZED);
    });

    test(`When token is null`, async () => {
        const res = await server.delete(`${urlAPI}${TESTING.UUID}`).set({ Authorization: null });
        const { body } = res;
        expect(body.statusCode).toBeDefined();
        expect(body.statusCode).toBe(STATUS_CODES.UNAUTHORIZED);
        expect(body.error).toBeDefined();
        expect(body.error).toEqual(STATUS_CODES_NAME.UNAUTHORIZED);
        expect(body.message).toBeDefined();
        expect(body.message).toEqual(expect.any(String));
        expect(res.status).toBe(STATUS_CODES.UNAUTHORIZED);
    });
    
    test(`When token is json`, async () => {
        const res = await server.delete(`${urlAPI}${TESTING.UUID}`).set({ Authorization: {} });
        const { body } = res;
        expect(body.statusCode).toBeDefined();
        expect(body.statusCode).toBe(STATUS_CODES.UNAUTHORIZED);
        expect(body.error).toBeDefined();
        expect(body.error).toEqual(STATUS_CODES_NAME.UNAUTHORIZED);
        expect(body.message).toBeDefined();
        expect(body.message).toEqual(expect.any(String));
        expect(res.status).toBe(STATUS_CODES.UNAUTHORIZED);
    });
    
    test(`When token is number`, async () => {
        const res = await server.delete(`${urlAPI}${TESTING.UUID}`).set({ Authorization: 123 });
        const { body } = res;
        expect(body.statusCode).toBeDefined();
        expect(body.statusCode).toBe(STATUS_CODES.UNAUTHORIZED);
        expect(body.error).toBeDefined();
        expect(body.error).toEqual(STATUS_CODES_NAME.UNAUTHORIZED);
        expect(body.message).toBeDefined();
        expect(body.message).toEqual(expect.any(String));
        expect(res.status).toBe(STATUS_CODES.UNAUTHORIZED);
    });
    
    test(`When token is array`, async () => {
        const res = await server.delete(`${urlAPI}${TESTING.UUID}`).set({ Authorization: [] });
        const { body } = res;
        expect(body.statusCode).toBeDefined();
        expect(body.statusCode).toBe(STATUS_CODES.UNAUTHORIZED);
        expect(body.error).toBeDefined();
        expect(body.error).toEqual(STATUS_CODES_NAME.UNAUTHORIZED);
        expect(body.message).toBeDefined();
        expect(body.message).toEqual(expect.any(String));
        expect(res.status).toBe(STATUS_CODES.UNAUTHORIZED);
    });
    
    test(`When token is string`, async () => {
        const res = await server.delete(`${urlAPI}${TESTING.UUID}`).set({ Authorization: 'hola' });
        const { body } = res;
        expect(body.statusCode).toBeDefined();
        expect(body.statusCode).toBe(STATUS_CODES.UNAUTHORIZED);
        expect(body.error).toBeDefined();
        expect(body.error).toEqual(STATUS_CODES_NAME.UNAUTHORIZED);
        expect(body.message).toBeDefined();
        expect(body.message).toEqual(expect.any(String));
        expect(res.status).toBe(STATUS_CODES.UNAUTHORIZED);
    });
    
    test(`When token is boolean`, async () => {
        const res = await server.delete(`${urlAPI}${TESTING.UUID}`).set({ Authorization: true });
        const { body } = res;
        expect(body.statusCode).toBeDefined();
        expect(body.statusCode).toBe(STATUS_CODES.UNAUTHORIZED);
        expect(body.error).toBeDefined();
        expect(body.error).toEqual(STATUS_CODES_NAME.UNAUTHORIZED);
        expect(body.message).toBeDefined();
        expect(body.message).toEqual(expect.any(String));
        expect(res.status).toBe(STATUS_CODES.UNAUTHORIZED);
    });

    test(`When token is Date`, async () => {
        const res = await server.delete(`${urlAPI}${TESTING.UUID}`).set({ Authorization: new Date() });
        const { body } = res;
        expect(body.statusCode).toBeDefined();
        expect(body.statusCode).toBe(STATUS_CODES.UNAUTHORIZED);
        expect(body.error).toBeDefined();
        expect(body.error).toEqual(STATUS_CODES_NAME.UNAUTHORIZED);
        expect(body.message).toBeDefined();
        expect(body.message).toEqual(expect.any(String));
        expect(res.status).toBe(STATUS_CODES.UNAUTHORIZED);
    });
    
    test(`When token is not valid`, async () => {
        const res = await server.delete(`${urlAPI}${TESTING.UUID}`).set({ Authorization: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZFVzZXIiOiIybmxJWm41djQiLCJpYXQiOjE2NzMzNjg4MzksImV4cCI6MTY3MzQxMjAzOX0.ZVo8zfhJj0meY9wVDk22WRQr' });
        const { body } = res;
        expect(body.statusCode).toBeDefined();
        expect(body.statusCode).toBe(STATUS_CODES.UNAUTHORIZED);
        expect(body.error).toBeDefined();
        expect(body.error).toEqual(STATUS_CODES_NAME.UNAUTHORIZED);
        expect(body.message).toBeDefined();
        expect(body.message).toEqual(expect.any(String));
        expect(res.status).toBe(STATUS_CODES.UNAUTHORIZED);
    });
    
    test(`When token is expired`, async () => {
        const res = await server.delete(`${urlAPI}${TESTING.UUID}`).set({ Authorization: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZFVzZXIiOiIybmxJWm41djQiLCJpYXQiOjE2NzMzNjg4MzksImV4cCI6MTY3MzQxMjAzOX0.ZVo8zfhJj0meY9wVDk22WRQrUuMpxHn0VrjkawqbT5w' });
        const { body } = res;
        expect(body.statusCode).toBeDefined();
        expect(body.statusCode).toBe(STATUS_CODES.UNAUTHORIZED);
        expect(body.error).toBeDefined();
        expect(body.error).toEqual(STATUS_CODES_NAME.UNAUTHORIZED);
        expect(body.message).toBeDefined();
        expect(body.message).toEqual(expect.any(String));
        expect(res.status).toBe(STATUS_CODES.UNAUTHORIZED);
    });

    test(`When token is valid and inventoryID is valid`, async () => {
        const res = await server.delete(`${urlAPI}${inventoryID}`).set({ Authorization: tokenNaum });
        const { body } = res;
        expect(body.statusCode).toBeDefined();
        expect(body.statusCode).toBe(STATUS_CODES.OK);
        expect(res.status).toBe(STATUS_CODES.OK);
    });
});