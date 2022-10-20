import { randomUUID } from 'node:crypto';

import winston from 'winston';
import WebSocket from 'ws';

import { MESSAGE_TYPES, STATUS_CODES } from '../constants';
import { IWebsocketLogData } from '../interfaces';
import { validateMessageData } from '../lib';

class WebsocketController {
  websocketId: string;
  websocket: WebSocket;

  constructor() {
    this.websocketId = randomUUID();
  }

  // eslint-disable-next-line max-lines-per-function
  initWebsocket(incomingWebsocket: WebSocket): void {
    this.websocket = incomingWebsocket;

    this.websocket.addEventListener(
      'message',
      (message: WebSocket.MessageEvent) => {
        if (validateMessageData(message.data)) {
          const { type } = JSON.parse(message.data);

          switch (type) {
            case MESSAGE_TYPES.OPEN:
              this.onOpenMessage(message);
              break;
            case MESSAGE_TYPES.RESPONSE:
              this.onResponseMessage(message);
              break;
            default:
              break;
          }
        }
      },
    );

    this.websocket.addEventListener('close', (event: WebSocket.CloseEvent) => {
      const list = global.websocketsList;
      const index = list.findIndex(
        (websocket) => websocket.websocketId === this.websocketId,
      );
      if (index > -1) {
        global.websocketsList.splice(index, 1);
      }
      winston.info(
        `Connection ${this.websocketId} closed successfully with code [${event.code}]`,
      );
    });
  }

  private onResponseMessage(message: WebSocket.MessageEvent): void {
    const { apiId } = validateMessageData(message.data)
      ? JSON.parse(message.data)
      : undefined;
    if (!apiId) {
      this.logAndSendResponse({
        responseMessage: `Missed apiId in message on websocket ID ${this.websocketId}`,
        logLevel: 'error',
        status: STATUS_CODES.BAD_REQUEST,
      });

      return;
    }
    const index = global.websocketsList.findIndex(
      (websocket) => websocket.websocketId === this.websocketId,
    );
    global.websocketsList[index].lastMessage = message.data;
    this.logAndSendResponse({
      responseMessage: 'Message received successfully',
      logLevel: 'info',
      status: STATUS_CODES.ACCEPTED,
    });
  }

  private onOpenMessage(message: WebSocket.MessageEvent): void {
    const { apiId } = validateMessageData(message.data)
      ? JSON.parse(message.data)
      : undefined;
    if (!apiId) {
      this.logAndSendResponse({
        responseMessage: `Missed apiId in message on websocket ID ${this.websocketId}`,
        logLevel: 'error',
        status: STATUS_CODES.BAD_REQUEST,
      });

      return;
    }
    const websocketItem = global.websocketsList.find((item) => item.apiId);
    if (!websocketItem) {
      global.websocketsList.push({
        apiId: apiId,
        websocketId: this.websocketId,
        websocketData: this.websocket,
      });
      this.logAndSendResponse({
        responseMessage: `Websocket with ${apiId} opened successfully`,
        logLevel: 'info',
        status: STATUS_CODES.CREATED,
      });
    } else {
      this.logAndSendResponse({
        responseMessage: `Retrying to open an existing connection with API ${apiId}`,
        logLevel: 'warn',
        status: STATUS_CODES.CONFLICT,
      });
    }
  }

  private logAndSendResponse(data: IWebsocketLogData): void {
    const { status, logLevel, responseMessage } = data;
    winston[logLevel](responseMessage);
    this.websocket.send(
      JSON.stringify({
        type: MESSAGE_TYPES.RESPONSE,
        status,
        info: responseMessage,
      }),
    );
  }
}

export default new WebsocketController();
