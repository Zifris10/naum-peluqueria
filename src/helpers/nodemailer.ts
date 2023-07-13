import { createTransport } from 'nodemailer';
import { convertPugFile } from './';
import { MailOptionsInterface, UserInterface } from '../interfaces';

const {
    AWS_SES_HOST,
    AWS_SES_PORT,
    AWS_SES_USER,
    AWS_SES_PASSWORD,
    AWS_SES_FROM,
    LOCALHOST
} = process.env;

const sesHost = AWS_SES_HOST as string;
const sesPort = AWS_SES_PORT as string;
const sesUser = AWS_SES_USER as string;
const sesPassword = AWS_SES_PASSWORD as string;
const sesFrom = AWS_SES_FROM as string;

const transporter = createTransport({
    host: sesHost,
    port: parseInt(sesPort),
    secure: false,
    auth: {
        user: sesUser,
        pass: sesPassword
    }
});

export const emailForgotPassword = async (user: UserInterface, token: string): Promise<void> => {
    const pug: string = convertPugFile('emails/emailForgotPassword', { user, token });
    const mailOptions: MailOptionsInterface = {
        to: user.email,
        subject: `${user.name}, ¿Quieres cambiar tu contraseña?`,
        from: sesFrom,
        html: pug
    };
    await sendMail(mailOptions);
};

const sendMail = async (mailOptions: MailOptionsInterface): Promise<void> => {
    if(!LOCALHOST) await transporter.sendMail(mailOptions);
};