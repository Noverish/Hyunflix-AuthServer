import * as morgan from 'morgan';
import * as moment from 'moment';

morgan.token('remote-addr', (req, res) => {
  const ip = req.ip || req._remoteAddress || (req.connection && req.connection.remoteAddress) || undefined;
  if (ip && typeof ip === 'string' && ip.split(':').length === 4) {
    return ip.split(':')[3];
  }

  return ip;
});

morgan.token('date', (req, res) => {
  return moment().format('YYYY-MM-DD HH:mm:ss');
});

const consoleFormat = '[:date] :remote-addr - :method :status :response-time ms ":url"';
export const consoleLogger = morgan(consoleFormat);
