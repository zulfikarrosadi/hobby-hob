import express from 'express';
import logger from './utils/logger';
import routes from './routes';
import c from 'config';
import cookieParser from 'cookie-parser';
import cors from 'cors';

const app = express();
app.use(
  cors({
    origin: ['http://127.0.0.1:5173', 'http://127.0.0.1:5500'],
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: [
      'Content-Type',
      'Set-Cookie',
      'Origin',
      'X-Access-Token',
      'X-Refresh-Token',
    ],
    credentials: true,
  }),
);
app.use(express.json());
app.use(cookieParser());

const port = c.get<number>('port');

app.listen(port, () => {
  routes(app);
  logger.info(`Server running at ${c.get<string>('endpoint')}`);
});
