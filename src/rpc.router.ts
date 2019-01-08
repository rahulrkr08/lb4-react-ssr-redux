
import {RPCServer} from './rpc.server';
import * as express from 'express';
import * as parser from 'body-parser';

export function rpcRouter(server: RPCServer) {
  const jsonParser = parser.json();
  server.expressServer.post('*', jsonParser, async (request, response) => {
    try {
      const res = await routeHandler(server, request.body.controller, request.body.method, request.body.input);
      response.send(res);
    } catch (err) {
      sendErrResponse(response, err, 400);
      return;
    }
  });

  server.expressServer.get('/ex/:controller/:method', async (request, response) => {
    console.log(request.params);
    // await routeHandler(server, request, response);
  });
}

export async function routeHandler(
  server: RPCServer,
  ctrl: string, 
  method: string, 
  input: object
) {
  let controller: Controller;
  try {
    controller = await server.get<Controller>(`controllers.${ctrl}`);
    if (!controller[method]) {
      throw new Error(
        `No method was found on controller "${ctrl}" with name "${method}".`,
      );
    }
  } catch (err) {
    throw err;
  }
  try {
    return await controller[method](input);
  } catch (err) {
    throw err;
  }
}

export type Controller = {
  [method: string]: Function;
};

function sendErrResponse(
  resp: express.Response,
  // tslint:disable-next-line:no-any
  send: any,
  statusCode: number,
) {
  resp.statusCode = statusCode;
  resp.send(send);
}
