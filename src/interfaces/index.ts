import WebSocket from 'ws';

export interface IExtendedWebSocket extends WebSocket {
  lastResponse: string;
}

export interface IWebsocketsListItem {
  websocketId: string;
  apiId: string;
  websocketData: WebSocket;
  lastMessage?: string;
}
