import 'reflect-metadata';

import express, { Request, Response, NextFunction } from 'express';
import 'express-async-errors';
import cors from 'cors';

import routes from '.';
import uploadConfig from '../../../../config/upload';
import AppError from '../../../errors/AppError';

import '../typeorm';
import '../../../container';

const app = express();
app.use(cors());
app.use(express.json());
app.use('/files', express.static(uploadConfig.tempFolder));
app.use(routes);
app.use(
  (err: Error, request: Request, response: Response, next: NextFunction) => {
    if (err instanceof AppError) {
      return response.status(err.statusCode).json({
        status: 'error',
        message: err.message,
      });
    }

    console.error(err);

    return response.status(500).json({
      status: 'error',
      message: 'Internal server error',
    });
  },
);

app.listen(3333, () => {
  console.log('!Server started ( port 3333)!');
});
