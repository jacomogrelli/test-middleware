import { Request, Response } from 'express';

import { IWebsocketsListItem } from './websocket';

class WebController {
  requestToWebsocket(request: Request, response: Response) {
    const apiId = request.body.apiId;
    const websocketItem: IWebsocketsListItem = global.websocketsList.find(
      (websocketData) => websocketData.apiId === apiId,
    );
    if (!websocketItem) {
      throw new Error('Websocket connection with api closed');
    }
    websocketItem.websocketData.send(JSON.stringify(request));
    // TODO: await for API response and transfer it
    response.json('Request successfully send to api');
  }
}

export default new WebController();
