import { randomUUID } from 'node:crypto';

import { isString } from 'type-guards';
import WebSocket from 'ws';

import { isJsonString } from '../lib';

class WebsocketController {
  // eslint-disable-next-line max-lines-per-function
  initWebsocket(websocket: WebSocket): void {
    const websocketId: string = randomUUID();

    websocket.addEventListener('message', (message: WebSocket.MessageEvent) => {
      if (isString(message.data) && isJsonString(message.data)) {
        const { apiId } = JSON.parse(message.data);
        const index = global.websocketsList
          .map((websocket) => websocket.apiId)
          .indexOf(apiId);
        if (index < 0) {
          global.websocketsList.push({
            apiId: apiId,
            websocketId: websocketId,
            websocketData: websocket,
          });
        }
        console.log(global.websocketsList.length);
        console.log(`Received message from client ${apiId}`);
        websocket.send('Message received successfully');
      }
    });

    websocket.addEventListener('close', (_event: WebSocket.CloseEvent) => {
      const list = global.websocketsList;
      const index = list.findIndex(
        (websocket) => websocket.websocketId === websocketId,
      );
      if (index > -1) {
        global.websocketsList.splice(index, 1);
      }
      console.log(`Connection ${websocketId} closed successfully`);
    });
  }
}

export default new WebsocketController();
