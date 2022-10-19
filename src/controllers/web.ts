import { Request, Response } from 'express';
import { error } from 'winston';

import { IWebsocketsListItem } from '../interfaces';

class WebController {
  requestToWebsocket(request: Request, response: Response) {
    const apiId = request.body?.apiId || 'dummy_id';
    const websocketItem: IWebsocketsListItem = global.websocketsList.find(
      (websocketData) => websocketData.apiId === apiId,
    );
    if (!websocketItem) {
      const message = `Websocket connection with api ${apiId} closed`;
      error(message);
      throw new Error(message);
    }
    websocketItem.websocketData.send(request.body);
    response.status(200).json(websocketItem.lastMessage);
  }
}

export default new WebController();
