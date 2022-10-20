import WebSocket from 'ws';

import { STATUS_CODES } from '../constants';

export interface IWebsocketsListItem {
  websocketId: string;
  apiId: string;
  websocketData: WebSocket;
  lastMessage?: string;
}

export interface IWebsocketLogData {
  logLevel: string;
  status: STATUS_CODES;
  responseMessage: string;
}
