import * as express from 'express';
import * as cookieParser from 'cookie-parser';
import { createConnection } from 'typeorm';

import { PORT } from '@src/config';
import routes from '@src/routes';
import { logger } from '@src/middlewares';
import cors from '@src/middlewares/cors';

const app = express();

app.use(cors);
app.use(express.json());
app.use(cookieParser());

app.use(logger);

app.use('/', routes);

app.use((req, res, next) => {
  res.status(404);
  res.json({ msg: 'Not Found' });
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500);
  res.json({ msg: err.stack });
});

app.listen(PORT, () => {
  console.log(`* Auth Server Started at ${PORT}`);
});

createConnection();
