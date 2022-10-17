export {};

declare global {
  namespace WebSocket {
    interface MessageEvent {
      data: any;
      someDummyString: string;
    }
  }
}
