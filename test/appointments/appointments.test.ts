import request from 'supertest';
import dotenv from 'dotenv';
dotenv.config();
import { TESTING, STATUS_CODES, STATUS_CODES_NAME } from '../../src/helpers';
const server = request(TESTING.HOST);
let tokenNaum: string = '';

beforeAll(async () => {
    const dataLogin = {
        email: TESTING.EMAIL,
        password: TESTING.PASSWORD
    };
    const getToken = await server.post('/auth/login').send(dataLogin);
    tokenNaum = getToken.body.token;
});

describe('GET /appointments/', () => {
    const urlAPI: string = '/appointments/';

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
        expect(body.data).toBeDefined();
        expect(body.data[0]).toEqual({
            id: expect.any(String),
            title: expect.any(String),
            start: expect.any(String),
            end: expect.any(String),
            backgroundColor: expect.any(String),
            phone: expect.any(String)
        });
    });
});