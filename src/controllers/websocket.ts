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
        const { apiId, type } = JSON.parse(message.data);
        if (type !== 'response') {
          return;
        }
        let websocketItem = global.websocketsList.find(
          (websocket) => websocket.apiId,
        );
        if (!websocketItem) {
          websocketItem = {
            apiId: apiId,
            websocketId: websocketId,
            websocketData: websocket,
            lastMessage: message.data,
          };
          global.websocketsList.push(websocketItem);
        } else {
          websocketItem.lastMessage = message.data;
        }
        console.log(`Received message from client ${apiId}`);
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
