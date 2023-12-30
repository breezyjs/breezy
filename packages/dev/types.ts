import { Key } from "path-to-regexp";

export type BootstrapOptions = {
  port?: number;
  host?: string;
  onListen?: (err: Error | null, address: string) => void;
  onClose?: () => void;
}

export interface RequestGenericInterface {
  Body?: unknown;
  Query?: Record<string, unknown>;
  Params?: Record<string, unknown>;
  Headers?: Record<string, unknown>;
  Cookie?: Record<string, unknown>;
}

export interface ResponseGenericInterface {
  Headers?: Record<string, string>;
  Body?: unknown;
}

export interface RouteGenericInterface {
  Req: RequestGenericInterface;
  Res: ResponseGenericInterface;
}

export type HttpRequest<T extends RequestGenericInterface = Record<string, unknown>> = {
  method: string;
  version: string;
  path: string;
  body: T["Body"];
  query: T["Query"];
  params: T["Params"];
  headers: T["Headers"];
  cookie: T["Cookie"];
  store: any;
  extensions: any;
}

export type HttpResponse<T extends ResponseGenericInterface = Record<string, unknown>> = {
  headers: T["Headers"];
  status: number;
  body: T["Body"];
}

export type Handler = {
  method: "get" | "put" | "post" | "delete" | "options" | "head" | "patch" | "trace";
  path: string;
  pathRegExp: RegExp;
  pathKeys: Key[];
  handler: (req: HttpRequest) => Promise<Partial<HttpResponse>>;
}