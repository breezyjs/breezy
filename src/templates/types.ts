export type BootstrapOptions = {
  port?: number;
  host?: string;
}

export type Response<TBody> = {
  headers: Record<string, string>;
  status: number;
  body: TBody;
}

export type Request<
  TBody,
  TQuery = Record<string, string>,
  TParams = Record<string, string>,
  THeader = Record<string, string>,
  TCookie = Record<string, string>
> = {
  method: string;
  uri: string;
  version: string;
  path: string;
  host: string;
  scheme: string;
  peerAddr?: string;
  realIpRemoteAddr?: string;
  body: TBody;
  query: TQuery;
  params: TParams;
  headers: THeader;
  cookie: TCookie;
  store: any;
}
