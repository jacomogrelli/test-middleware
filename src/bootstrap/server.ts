import express from 'express';
import expressWs from 'express-ws';
import winston from 'winston';

import initRouter from './router';

export default function initServer() {
  const app = express();
  const port = process.env.PORT;
  global.websocketsList = [];

  expressWs(app);
  initRouter(app);

  app.listen(port, () => {
    winston.info(`Middleware server start on port ${port}`);
  });
}
