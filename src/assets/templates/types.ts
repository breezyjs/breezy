export type BootstrapOptions = {
  port?: number;
  host?: string;
  onListen?: (err: Error | null, address: string) => void;
  onClose?: () => void;
}

export type Response<TBody = any> = {
  headers: Record<string, string>;
  status: number;
  body: TBody;
}

export type RequestBodyDefault = unknown;
export type RequestQueryDefault = {};
export type RequestParamsDefault = {};
export type RequestHeadersDefault = {};
export type RequestCookieDefault = {};

interface RequestGenericInterface {
  Body?: RequestBodyDefault;
  Query?: RequestQueryDefault;
  Params?: RequestParamsDefault;
  Headers?: RequestHeadersDefault;
  Cookie?: RequestCookieDefault;
}

export type Request<T extends RequestGenericInterface = {}> = {
  method: string;
  uri: string;
  version: string;
  path: string;
  host: string;
  scheme: string;
  peerAddr?: string;
  realIpRemoteAddr?: string;
  body: T["Body"];
  query: T["Query"];
  params: T["Params"];
  headers: T["Headers"];
  cookie: T["Cookie"];
  store: any;
  extensions: any;
}
