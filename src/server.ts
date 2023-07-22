import express, { Express } from 'express';
import dotenv from 'dotenv';
dotenv.config();
import cors from 'cors';
import helmet from 'helmet';
import path from 'path';
import mainRouter from './routes/routes';
import viewsRoute from './views/views.routes';
import { errorResponse } from './handlers';

const app: Express = express();
const port: number = process.env.PORT ? parseInt(process.env.PORT) : 4000;

app.set('views', '../views');
app.set('view engine', 'pug');
app.use(cors({ origin: '*' }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/views', viewsRoute);
app.use('/api/v1', mainRouter);
app.use(errorResponse);
app.use(express.static(path.resolve(__dirname, '../public')));
app.use(helmet());

app.listen(port, () => console.log(`Server is running at http://localhost:${port}`));