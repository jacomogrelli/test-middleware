import { Request, Response } from 'express';
import { error } from 'winston';

import { IWebsocketsListItem } from '../interfaces';

class WebController {
  requestToWebsocket(request: Request, response: Response) {
    const apiId = request.body?.apiId || 'dummy_id';
    const type = request.body?.type || 'request';
    const summary = new Date().getSeconds();
    const websocketItem: IWebsocketsListItem = global.websocketsList.find(
      (websocketData) => websocketData.apiId === apiId,
    );
    if (!websocketItem) {
      const message = `Websocket connection with api ${apiId} closed`;
      error(message);
      throw new Error(message);
    }

    global.httpResponsesQueue.push(response);
    websocketItem.websocketData.send(JSON.stringify({ type, apiId, summary }));
  }
}

export default new WebController();
