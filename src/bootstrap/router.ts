import express from 'express';

import WebController from '../controllers/web';
import WebsocketController from '../controllers/websocket';

export default function initRouter(app) {
  const router = express.Router();

  router.ws('/ws-request', WebsocketController.initWebsocket);
  router.get('/web-app-request', WebController.requestToWebsocket);

  app.use('/', router);
}
