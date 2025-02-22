import * as winston from 'winston';
import 'winston-daily-rotate-file';
import { v4 } from 'uuid';

const consoleTransport = new winston.transports.Console({
	format: winston.format.combine(
		winston.format.colorize(),
		winston.format.printf((info) => `[${info.level}]: ${info.message}`)
	),
});

const fileTransport = new winston.transports.DailyRotateFile({
	level: 'info',
	format: winston.format.combine(
		winston.format.metadata(),
		winston.format.timestamp(),
		winston.format.printf((info: any) => {
			const id = info?.metadata?.id;
			const idText = id ? `(${id}) ` : '';

			return `${idText}[${info.timestamp}] [${info.level}]: ${info.message}`;
		})
	),
	zippedArchive: true,
	filename: '%DATE%.log',
	dirname: 'logs',
	datePattern: 'yyyy/[weeks]-ww/[day]-d',
	maxFiles: '30d',
	maxSize: '50m',
});

const loggerService = winston.createLogger({
	transports: [fileTransport],
});

if (process.env.NODE_ENV !== 'production') {
	loggerService.add(consoleTransport);
}

export default loggerService;
