import * as morgan from 'morgan';

import { dateToString } from '@src/utils';
import { REFRESH_TOKEN_PAYLOAD_FILED } from '@src/config';

morgan.token('remote-addr', (req, res) => {
  return req.headers['x-real-ip'];
});

morgan.token('date', (req, res) => {
  return dateToString(new Date());
});

morgan.token('user-id', (req, res) => {
  return req[REFRESH_TOKEN_PAYLOAD_FILED];
});

const consoleFormat = '[:date] <:remote-addr> :user-id :method :status :response-time ms ":url"';

export default morgan(consoleFormat);
