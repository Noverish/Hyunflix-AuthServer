import * as express from 'express';
import * as cookieParser from 'cookie-parser';
import * as cors from 'cors';
import { createConnection } from 'typeorm';

import { PORT } from '@src/config';
import routes from '@src/routes';
import * as rsa from '@src/utils/rsa';
import { consoleLogger } from '@src/utils/logger';

const app = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.use(consoleLogger);

app.use('/', routes);

app.use((req, res, next) => {
  res.status(404);
  res.json({ msg: 'Not Found' });
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500);
  res.json(err);
});

app.listen(PORT, () => {
  console.log(`* Auth Server Started at ${PORT}`);
});

export const rsaKeyPair: rsa.RSAKeyPair = rsa.generateKey();
createConnection();