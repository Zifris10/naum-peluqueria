export enum SCHEMAS {
    PUBLIC = 'naum'
};

export enum TABLES {
    USERS = 'users',
    SUPER_ADMINS = 'superAdmins'
  };

export enum TOKEN_EXPIRATION {
    TEN_MINUTES = '10m',
    ONE_HOUR = '1h',
    TWO_HOURS = '2h'
};

export enum STATUS_CODES {
    OK = 200,
    BAD_REQUEST = 400,
    UNAUTHORIZED = 401
}

export enum MESSAGE_INTERNAL_SERVER_ERROR {
    message = 'Oops, lo sentimos pero ha ocurrido un error interno en el servidor.'
}

export enum QUERY_PARAMS {
    PARAMS = 'params',
    BODY = 'body',
    QUERY = 'query'
  };