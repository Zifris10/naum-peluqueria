import { createTransport } from 'nodemailer';
import { convertPugFile } from './';
import { MailOptionsInterface, UserInterface } from '../interfaces';

const {
    SES_HOST,
    SES_PORT,
    SES_USER,
    SES_PASSWORD,
    SES_FROM
} = process.env;

const sesHost = SES_HOST as string;
const sesPort = SES_PORT as string;
const sesUser = SES_USER as string;
const sesPassword = SES_PASSWORD as string;
const sesFrom = SES_FROM as string;

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
    await transporter.sendMail(mailOptions);
};