import * as morgan from 'morgan';
import { dateToString } from '@src/utils';

morgan.token('remote-addr', (req, res) => {
  return req.headers['x-real-ip'];
});

morgan.token('date', (req, res) => {
  return dateToString(new Date());
});

const consoleFormat = '[:date] <:remote-addr> :method :status :response-time ms ":url"';

export default morgan(consoleFormat);
