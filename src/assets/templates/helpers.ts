import { FastifyReply, FastifyRequest } from "fastify";
import { Request, Response } from "./types";

export function transformRequest<T extends Request>(request: FastifyRequest): T {
  return {
    method: request.method,
    uri: request.originalUrl,
    version: request.raw.httpVersion,
    path: request.routerPath,
    host: request.hostname,
    scheme: request.protocol,
    peerAddr: request.ip,
    realIpRemoteAddr: request.ip,
    body: request.body,
    query: request.query,
    params: request.params,
    headers: request.headers,
    cookie: {},
    store: {},
    extensions: {}
  } as T;
}

export function sendResponse(response: Partial<Response>, reply: FastifyReply): FastifyReply {
  if (response.headers) {
    reply.headers(response.headers);
  }
  if (response.status) {
    reply.status(response.status);
  }

  return reply.send(response.body);
}
