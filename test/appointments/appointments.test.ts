import request from 'supertest';
import dotenv from 'dotenv';
dotenv.config();
import { TESTING, STATUS_CODES, STATUS_CODES_NAME } from '../../src/helpers';
import { AppointmentsModel } from '../../src/models';
const server = request(TESTING.HOST);
let tokenNaum: string = '';
let appointmentID: string = '';

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
            id: appointmentID
        },
        force: true
    };
    await AppointmentsModel.destroy(where);
});

describe('POST /appointments/', () => {
    const urlAPI: string = '/appointments/';

    test(`When we don't have a token`, async () => {
        const data = {
            startDate: '2023-07-22',
            startTime: '10:00',
            endTime: '11:00',
            name: 'Cliente joven',
            phone: ''
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
            startDate: '2023-07-22',
            startTime: '10:00',
            endTime: '11:00',
            name: 'Cliente joven',
            phone: ''
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
            startDate: '2023-07-22',
            startTime: '10:00',
            endTime: '11:00',
            name: 'Cliente joven',
            phone: ''
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
            startDate: '2023-07-22',
            startTime: '10:00',
            endTime: '11:00',
            name: 'Cliente joven',
            phone: ''
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
            startDate: '2023-07-22',
            startTime: '10:00',
            endTime: '11:00',
            name: 'Cliente joven',
            phone: ''
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
            startDate: '2023-07-22',
            startTime: '10:00',
            endTime: '11:00',
            name: 'Cliente joven',
            phone: ''
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
            startDate: '2023-07-22',
            startTime: '10:00',
            endTime: '11:00',
            name: 'Cliente joven',
            phone: ''
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
            startDate: '2023-07-22',
            startTime: '10:00',
            endTime: '11:00',
            name: 'Cliente joven',
            phone: ''
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
            startDate: '2023-07-22',
            startTime: '10:00',
            endTime: '11:00',
            name: 'Cliente joven',
            phone: ''
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
            startDate: '2023-07-22',
            startTime: '10:00',
            endTime: '11:00',
            name: 'Cliente joven',
            phone: ''
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

    test(`When startDate is undefined`, async () => {
        const data = {
            startDate: '2023-07-22',
            startTime: '10:00',
            endTime: '11:00',
            name: 'Cliente joven',
            phone: ''
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

    test(`When startDate is number`, async () => {
        const data = {
            startDate: 123,
            startTime: '10:00',
            endTime: '11:00',
            name: 'Cliente joven',
            phone: ''
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

    test(`When startDate is null`, async () => {
        const data = {
            startDate: null,
            startTime: '10:00',
            endTime: '11:00',
            name: 'Cliente joven',
            phone: ''
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

    test(`When startDate is json`, async () => {
        const data = {
            startDate: {},
            startTime: '10:00',
            endTime: '11:00',
            name: 'Cliente joven',
            phone: ''
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

    test(`When startDate is array`, async () => {
        const data = {
            startDate: [],
            startTime: '10:00',
            endTime: '11:00',
            name: 'Cliente joven',
            phone: ''
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

    test(`When startDate is boolean`, async () => {
        const data = {
            startDate: true,
            startTime: '10:00',
            endTime: '11:00',
            name: 'Cliente joven',
            phone: ''
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

    test(`When startDate is Date`, async () => {
        const data = {
            startDate: new Date(),
            startTime: '10:00',
            endTime: '11:00',
            name: 'Cliente joven',
            phone: ''
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

    test(`When startDate is empty`, async () => {
        const data = {
            startDate: '',
            startTime: '10:00',
            endTime: '11:00',
            name: 'Cliente joven',
            phone: ''
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

    test(`When startTime is undefined`, async () => {
        const data = {
            startDate: '2023-07-22',
            endTime: '11:00',
            name: 'Cliente joven',
            phone: ''
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

    test(`When startTime is number`, async () => {
        const data = {
            startDate: '2023-07-22',
            startTime: 123,
            endTime: '11:00',
            name: 'Cliente joven',
            phone: ''
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

    test(`When startTime is null`, async () => {
        const data = {
            startDate: '2023-07-22',
            startTime: null,
            endTime: '11:00',
            name: 'Cliente joven',
            phone: ''
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

    test(`When startTime is json`, async () => {
        const data = {
            startDate: '2023-07-22',
            startTime: {},
            endTime: '11:00',
            name: 'Cliente joven',
            phone: ''
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

    test(`When startTime is array`, async () => {
        const data = {
            startDate: '2023-07-22',
            startTime: [],
            endTime: '11:00',
            name: 'Cliente joven',
            phone: ''
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

    test(`When startTime is boolean`, async () => {
        const data = {
            startDate: '2023-07-22',
            startTime: true,
            endTime: '11:00',
            name: 'Cliente joven',
            phone: ''
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

    test(`When startTime is Date`, async () => {
        const data = {
            startDate: '2023-07-22',
            startTime: new Date(),
            endTime: '11:00',
            name: 'Cliente joven',
            phone: ''
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

    test(`When startTime is empty`, async () => {
        const data = {
            startDate: '2023-07-22',
            startTime: '',
            endTime: '11:00',
            name: 'Cliente joven',
            phone: ''
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

    test(`When endTime is undefined`, async () => {
        const data = {
            startDate: '2023-07-22',
            startTime: '10:00',
            name: 'Cliente joven',
            phone: ''
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

    test(`When endTime is number`, async () => {
        const data = {
            startDate: '2023-07-22',
            startTime: '10:00',
            endTime: 123,
            name: 'Cliente joven',
            phone: ''
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

    test(`When endTime is null`, async () => {
        const data = {
            startDate: '2023-07-22',
            startTime: '10:00',
            endTime: null,
            name: 'Cliente joven',
            phone: ''
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

    test(`When endTime is json`, async () => {
        const data = {
            startDate: '2023-07-22',
            startTime: '10:00',
            endTime: {},
            name: 'Cliente joven',
            phone: ''
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

    test(`When endTime is array`, async () => {
        const data = {
            startDate: '2023-07-22',
            startTime: '10:00',
            endTime: [],
            name: 'Cliente joven',
            phone: ''
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

    test(`When endTime is boolean`, async () => {
        const data = {
            startDate: '2023-07-22',
            startTime: '10:00',
            endTime: false,
            name: 'Cliente joven',
            phone: ''
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

    test(`When endTime is Date`, async () => {
        const data = {
            startDate: '2023-07-22',
            startTime: '10:00',
            endTime: new Date(),
            name: 'Cliente joven',
            phone: ''
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

    test(`When endTime is empty`, async () => {
        const data = {
            startDate: '2023-07-22',
            startTime: '10:00',
            endTime: '',
            name: 'Cliente joven',
            phone: ''
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

    test(`When name is undefined`, async () => {
        const data = {
            startDate: '2023-07-22',
            startTime: '10:00',
            endTime: '11:00',
            phone: ''
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
            startDate: '2023-07-22',
            startTime: '10:00',
            endTime: '11:00',
            name: 123,
            phone: ''
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
            startDate: '2023-07-22',
            startTime: '10:00',
            endTime: '11:00',
            name: null,
            phone: ''
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
            startDate: '2023-07-22',
            startTime: '10:00',
            endTime: '11:00',
            name: {},
            phone: ''
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
            startDate: '2023-07-22',
            startTime: '10:00',
            endTime: '11:00',
            name: [],
            phone: ''
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
            startDate: '2023-07-22',
            startTime: '10:00',
            endTime: '11:00',
            name: true,
            phone: ''
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

    test(`When name is Date`, async () => {
        const data = {
            startDate: '2023-07-22',
            startTime: '10:00',
            endTime: '11:00',
            name: new Date(),
            phone: ''
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
            startDate: '2023-07-22',
            startTime: '10:00',
            endTime: '11:00',
            name: '',
            phone: ''
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

    test(`When name is less than 5 characters`, async () => {
        const data = {
            startDate: '2023-07-22',
            startTime: '10:00',
            endTime: '11:00',
            name: 'Hola',
            phone: ''
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

    test(`When name has more than 100 characters`, async () => {
        const data = {
            startDate: '2023-07-22',
            startTime: '10:00',
            endTime: '11:00',
            name: 'Hola Hola Hola Hola Hola Hola Hola Hola Hola Hola Hola Hola Hola Hola Hola Hola Hola Hola Hola Hola Hola Hola Hola Hola Hola Hola Hola Hola Hola Hola Hola Hola Hola Hola Hola Hola Hola Hola',
            phone: ''
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

    test(`When phone is undefined`, async () => {
        const data = {
            startDate: '2023-07-22',
            startTime: '10:00',
            endTime: '11:00',
            name: 'Cliente joven'
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

    test(`When phone is number`, async () => {
        const data = {
            startDate: '2023-07-22',
            startTime: '10:00',
            endTime: '11:00',
            name: 'Cliente joven',
            phone: 123
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

    test(`When phone is null`, async () => {
        const data = {
            startDate: '2023-07-22',
            startTime: '10:00',
            endTime: '11:00',
            name: 'Cliente joven',
            phone: null
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

    test(`When phone is json`, async () => {
        const data = {
            startDate: '2023-07-22',
            startTime: '10:00',
            endTime: '11:00',
            name: 'Cliente joven',
            phone: {}
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

    test(`When phone is array`, async () => {
        const data = {
            startDate: '2023-07-22',
            startTime: '10:00',
            endTime: '11:00',
            name: 'Cliente joven',
            phone: []
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

    test(`When phone is boolean`, async () => {
        const data = {
            startDate: '2023-07-22',
            startTime: '10:00',
            endTime: '11:00',
            name: 'Cliente joven',
            phone: false
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

    test(`When phone is Date`, async () => {
        const data = {
            startDate: '2023-07-22',
            startTime: '10:00',
            endTime: '11:00',
            name: 'Cliente joven',
            phone: new Date()
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

    test(`When date is less than current date`, async () => {
        const data = {
            startDate: '2023-07-20',
            startTime: '10:00',
            endTime: '11:00',
            name: 'Cliente joven',
            phone: ''
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

    test(`When the start time is greater than the end time`, async () => {
        const data = {
            startDate: '2026-07-22',
            startTime: '13:00',
            endTime: '11:00',
            name: 'Cliente joven',
            phone: ''
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
            startDate: '2026-07-22',
            startTime: '10:00',
            endTime: '11:00',
            name: 'Cliente joven',
            phone: ''
        };
        const res = await server.post(urlAPI).send(data).set({ Authorization: tokenNaum });
        const { body } = res;
        expect(body.statusCode).toBeDefined();
        expect(body.statusCode).toBe(STATUS_CODES.OK);
        expect(body.data).toBeDefined();
        expect(body.data).toEqual({
            id: expect.any(String),
            completed: false,
            price: expect.any(Number),
            deleted: false,
            startDate: expect.any(String),
            endDate: expect.any(String),
            name: expect.any(String),
            phone: expect.any(String),
            backgroundColor: expect.any(String),
            createdBy: expect.any(String),
            updatedAt: expect.any(String),
            createdAt: expect.any(String),
            deletedBy: null,
            worker: ''
        });
        appointmentID = body.data.id;
        expect(res.status).toBe(STATUS_CODES.OK);
    });
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
        expect(body.html).toBeDefined();
        expect(body.html).toEqual(expect.any(String));
    });
});

describe('PUT /appointments/:appointmentID/complete', () => {
    const urlAPI: string = '/appointments/';

    test(`When appointmentID is not uuid`, async () => {
        const data = {
            price: 400,
            worker: 'Naum'
        };
        const res = await server.put(`${urlAPI}uuid/complete`).set({ Authorization: tokenNaum }).send(data);
        const { body } = res;
        expect(body.statusCode).toBeDefined();
        expect(body.statusCode).toBe(STATUS_CODES.BAD_REQUEST);
        expect(body.error).toBeDefined();
        expect(body.error).toEqual(STATUS_CODES_NAME.BAD_REQUEST);
        expect(body.message).toBeDefined();
        expect(body.message).toEqual(expect.any(String));
        expect(res.status).toBe(STATUS_CODES.BAD_REQUEST);
    });

    test(`When appointmentID is not found`, async () => {
        const data = {
            price: 400,
            worker: 'Naum'
        };
        const res = await server.put(`${urlAPI}${TESTING.UUID}/complete`).set({ Authorization: tokenNaum }).send(data);
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
        const data = {
            price: 400,
            worker: 'Naum'
        };
        const res = await server.put(`${urlAPI}${TESTING.UUID}/complete`).send(data);
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
            price: 400,
            worker: 'Naum'
        };
        const res = await server.put(`${urlAPI}${TESTING.UUID}/complete`).set({ Authorization: null }).send(data);
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
            price: 400,
            worker: 'Naum'
        };
        const res = await server.put(`${urlAPI}${TESTING.UUID}/complete`).set({ Authorization: {} }).send(data);
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
            price: 400,
            worker: 'Naum'
        };
        const res = await server.put(`${urlAPI}${TESTING.UUID}/complete`).set({ Authorization: 123 }).send(data);
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
            price: 400,
            worker: 'Naum'
        };
        const res = await server.put(`${urlAPI}${TESTING.UUID}/complete`).set({ Authorization: [] }).send(data);
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
            price: 400,
            worker: 'Naum'
        };
        const res = await server.put(`${urlAPI}${TESTING.UUID}/complete`).set({ Authorization: 'hola' }).send(data);
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
            price: 400,
            worker: 'Naum'
        };
        const res = await server.put(`${urlAPI}${TESTING.UUID}/complete`).set({ Authorization: true }).send(data);
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
            price: 400,
            worker: 'Naum'
        };
        const res = await server.put(`${urlAPI}${TESTING.UUID}/complete`).set({ Authorization: new Date() }).send(data);
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
            price: 400,
            worker: 'Naum'
        };
        const res = await server.put(`${urlAPI}${TESTING.UUID}/complete`).set({ Authorization: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZFVzZXIiOiIybmxJWm41djQiLCJpYXQiOjE2NzMzNjg4MzksImV4cCI6MTY3MzQxMjAzOX0.ZVo8zfhJj0meY9wVDk22WRQr' }).send(data);
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
            price: 400,
            worker: 'Naum'
        };
        const res = await server.put(`${urlAPI}${TESTING.UUID}/complete`).set({ Authorization: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZFVzZXIiOiIybmxJWm41djQiLCJpYXQiOjE2NzMzNjg4MzksImV4cCI6MTY3MzQxMjAzOX0.ZVo8zfhJj0meY9wVDk22WRQrUuMpxHn0VrjkawqbT5w' }).send(data);
        const { body } = res;
        expect(body.statusCode).toBeDefined();
        expect(body.statusCode).toBe(STATUS_CODES.UNAUTHORIZED);
        expect(body.error).toBeDefined();
        expect(body.error).toEqual(STATUS_CODES_NAME.UNAUTHORIZED);
        expect(body.message).toBeDefined();
        expect(body.message).toEqual(expect.any(String));
        expect(res.status).toBe(STATUS_CODES.UNAUTHORIZED);
    });

    test(`When price is undefined`, async () => {
        const data = {};
        const res = await server.put(`${urlAPI}${TESTING.UUID}/complete`).send(data).set({ Authorization: tokenNaum });
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
            price: null
        };
        const res = await server.put(`${urlAPI}${TESTING.UUID}/complete`).send(data).set({ Authorization: tokenNaum });
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
            price: {}
        };
        const res = await server.put(`${urlAPI}${TESTING.UUID}/complete`).send(data).set({ Authorization: tokenNaum });
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
            price: []
        };
        const res = await server.put(`${urlAPI}${TESTING.UUID}/complete`).send(data).set({ Authorization: tokenNaum });
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
            price: false
        };
        const res = await server.put(`${urlAPI}${TESTING.UUID}/complete`).send(data).set({ Authorization: tokenNaum });
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
            price: new Date()
        };
        const res = await server.put(`${urlAPI}${TESTING.UUID}/complete`).send(data).set({ Authorization: tokenNaum });
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
            price: ''
        };
        const res = await server.put(`${urlAPI}${TESTING.UUID}/complete`).send(data).set({ Authorization: tokenNaum });
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
            price: -400
        };
        const res = await server.put(`${urlAPI}${TESTING.UUID}/complete`).send(data).set({ Authorization: tokenNaum });
        const { body } = res;
        expect(body.statusCode).toBeDefined();
        expect(body.statusCode).toBe(STATUS_CODES.BAD_REQUEST);
        expect(body.error).toBeDefined();
        expect(body.error).toEqual(STATUS_CODES_NAME.BAD_REQUEST);
        expect(body.message).toBeDefined();
        expect(body.message).toEqual(expect.any(String));
        expect(res.status).toBe(STATUS_CODES.BAD_REQUEST);
    });

    test(`When token is valid and appointmentID is valid`, async () => {
        const data = {
            price: 400,
            worker: 'Naum'
        };
        const res = await server.put(`${urlAPI}${appointmentID}/complete`).set({ Authorization: tokenNaum }).send(data);
        const { body } = res;
        expect(body.statusCode).toBeDefined();
        expect(body.statusCode).toBe(STATUS_CODES.OK);
        expect(res.status).toBe(STATUS_CODES.OK);
    });
});

describe('DELETE /appointments/:appointmentID', () => {
    const urlAPI: string = '/appointments/';

    test(`When appointmentID is not uuid`, async () => {
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

    test(`When appointmentID is not found`, async () => {
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

    test(`When token is valid and appointmentID is valid`, async () => {
        const res = await server.delete(`${urlAPI}${appointmentID}`).set({ Authorization: tokenNaum });
        const { body } = res;
        expect(body.statusCode).toBeDefined();
        expect(body.statusCode).toBe(STATUS_CODES.OK);
        expect(res.status).toBe(STATUS_CODES.OK);
    });
});