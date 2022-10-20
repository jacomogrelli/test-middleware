import express from 'express';

import WebController from '../controllers/web';
import WebsocketController from '../controllers/websocket';

export default function initRouter(app) {
  const router = express.Router();

  router.ws('/ws-request', (websocket) =>
    WebsocketController.initWebsocket(websocket),
  );
  router.get('/web-app-request', (request, response) =>
    WebController.requestToWebsocket(request, response),
  );

  app.use('/', router);
}
