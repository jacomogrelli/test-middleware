import WebSocket from 'ws';

export interface IWebsocketsListItem {
  websocketId: string;
  apiId: string;
  websocketData: WebSocket;
}
