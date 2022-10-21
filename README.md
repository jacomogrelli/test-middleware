# Red queen Middleware<br><br>

## Description

As Red Queen API and master devices (hereinafter referred to as <b>The Red queen ecosystem APIs</b> or <b>RQE</b>) does not have open port for access outside the Enamine internal network, this app is
middleware between RQE APIs and external web applications.

## How it works

Middleware is Express.js based RESTfull API and redirects express requests from web applications via opened websocket to
RQE API and response backwards.
As websocket agent middleware works as server, so RQE API such master devices have to open websocket from their
side as client.
No database, no other functionality, just simple req/res message broker.

## Requirements

* OS: `Mac OS or Ubuntu` <br><sup>(other OS may works too, but not tested)</sup>
* Runtime environment: `Node.js v16.17.0`

## Tech stack, resources and documentation

* [Typescript](https://www.typescriptlang.org/)
* [Express.js](https://expressjs.com/)
* [Jest](https://jestjs.io/docs/en/api)
* [Express-ws](https://www.npmjs.com/package/express-ws)

## Endpoints list

* `/ws-request` for websocket clients
* `/web-app-request` for web app clients (just in progress)

## Steps to run middleware

* Clone repo ```git clone git@gitlab.com:b1900/redqueen-middleware.git``` <br><sup>note: ssh link, for access you have
  to be in Bienta GitLab developers team</sup>
* Install npm packages `npm install`
* Run development environment `npm run start:dev`

## NPM scripts

* `build:prod`: compile typescript to native javascript, location `<app_dir>/build`
* `start:prod`: `build:prod` + run native javascript code
* `start:dev`: start development environment with tracking changes in files with `ts-node-dev`
  package (`ts-node + nodemon`)
* `lint`: run linter autofix in `<app_dir>/src` directory

## Base communication interfaces

### WebApp <---> Middleware
`request`
```json
req: express.Request {
  body {
    apiId: string, //internal Red queen ecosystem master device or API unique id
  },
}
```
`response`
```json
res: express.Response {
  body: {
    //response from Red queen ecosystem API
  },
}
```

### Middleware <---> RQE API
`confirmation message`
```json
data: JSON like string {
  type: 'response',
  status: number, // HTTP status codes like
  info?: string // additional information 
}
```
`request to API`
```json
req: {
//solution in progress, possibly Buffer like raw express.Request
}
```
`response from API`
```json
res: WebSocket.MessageEvent {
  data: WebSocket.Data {
    apiId: string, //internal Red queen ecosystem master device or API unique id
    type: 'open' || 'response' || 'request',
    message: JSON like string // any additional response message
  },
}
```
