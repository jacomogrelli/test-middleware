import { resolve } from 'node:path';

import winston from 'winston';

function getLogFormat(): winston.Logform.Format {
  const { combine, timestamp, printf, colorize } = winston.format;
  const customFormat = printf(
    ({ level, message, timestamp }) =>
      `[${level.toUpperCase()} ${timestamp}]: ${message}`,
  );

  const logFormat = [
    timestamp({ format: 'HH:MM:ss YYYY-MM-DD' }),
    customFormat,
  ];

  if (process.env.APP_ENV === 'development') {
    logFormat.push(colorize({ all: true }));
  }

  return combine(...logFormat);
}

function getTransports(pathToLogDirectory: string) {
  const logTransports = [];
  logTransports.push(
    new winston.transports.File({
      filename: `${pathToLogDirectory}/${new Date().toUTCString()} - error.log`,
      level: 'error',
    }),
    new winston.transports.File({
      filename: `${pathToLogDirectory}/${new Date().toUTCString()} - combined.log`,
    }),
  );

  if (process.env.APP_ENV === 'development') {
    logTransports.push(
      new winston.transports.Console({
        format: winston.format.colorize(),
      }),
    );
  }

  return logTransports;
}

export default function initLogger() {
  const pathToLogDirectory = resolve('./logs/');
  const logTransports = getTransports(pathToLogDirectory);
  const logFormat = getLogFormat();

  winston.configure({
    transports: logTransports,
    level: 'info',
    format: logFormat,
    handleExceptions: true,
    silent: process.env.APP_ENV === 'test',
  });
}
