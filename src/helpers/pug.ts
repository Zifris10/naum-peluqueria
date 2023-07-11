import { resolve } from 'path';
import { renderFile } from 'pug';

export const convertPugFile = (route: string, data: any): string => {
    const html: string = renderFile(resolve(__dirname, `../../views/${route}.pug`), data);
    return html;
};