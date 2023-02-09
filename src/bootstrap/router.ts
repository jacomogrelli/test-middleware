import express from 'express';

import { WebController, WebsocketController } from '../controllers';

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
