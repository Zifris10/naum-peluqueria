export interface SwaggerInterface {
    definition: Definition;
    apis: string[];
}

interface Definition {
    openapi: string;
    info: Info;
    servers: Servers[];
}

interface Info {
    title: string;
    version: string;
    description: string;
    contact: Contact;
}

interface Contact {
    name: string;
    url: string;
}

interface Servers {
    url: string;
    description: string;
}