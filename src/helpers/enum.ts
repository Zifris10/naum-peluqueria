export enum SCHEMAS {
    PUBLIC = 'naum'
};

export enum TABLES {
    APPOINTMENTS = 'appointments',
    USERS = 'users',
    SUPER_ADMINS = 'superAdmins',
    INVENTORY = 'inventory',
    INVENTORY_HISTORY = 'inventoryHistory'
};

export enum TOKEN_EXPIRATION {
    FIFTEEN_MINUTES = '15m',
    TWENTY_DAYS = '20d',
    THIRTY_DAYS = '30d'
};

export enum STATUS_CODES {
    OK = 200,
    BAD_REQUEST = 400,
    UNAUTHORIZED = 401,
    NOT_FOUND = 404
};

export enum MESSAGE_INTERNAL_SERVER_ERROR {
    message = 'Oops, lo sentimos pero ha ocurrido un error interno en el servidor.'
};

export enum QUERY_PARAMS {
    PARAMS = 'params',
    BODY = 'body',
    QUERY = 'query'
};

export enum TESTING {
    EMAIL = 'eduardom362@gmail.com',
    PASSWORD = 'Hola123$',
    HOST = 'http://localhost:3000/api/v1',
    UUID = '94ef70d5-d501-4139-8a62-d0cfea091bd8'
};

export enum STATUS_CODES_NAME {
    BAD_REQUEST = 'Bad Request',
    UNAUTHORIZED = 'Unauthorized',
    NOT_FOUND = 'Not Found'
};

export enum TIMEZONES {
    MX = 'America/Mexico_City'
};