import * as http from "http";
import * as net from "net";
import { BootstrapOptions, Handler, HttpRequest, HttpResponse, RouteGenericInterface } from "./types";
import { pathToRegexp, Key } from "path-to-regexp";
import { prepareResponse } from "./utils/prepareResponse";
import parseBody from "./utils/parseBody";
import contentType from "content-type";

export * from "./types";

net.createServer();

export class HttpServer<TStore extends Record<string, unknown> = Record<string, unknown>> {
  private readonly store: TStore;
  private readonly server: http.Server;
  private readonly handler: Record<Handler["method"], Handler[]> = {
    get: [],
    put: [],
    post: [],
    delete: [],
    options: [],
    head: [],
    patch: [],
    trace: []
  };

  constructor() {
    this.store = {} as TStore;

    this.server = http.createServer(async (req, res) => {
      const bodyBuffer = await new Promise<Buffer>((resolve, reject) => {
        const bufferChunks: Buffer[] = [];
    
        req.on("data", (chunk: Buffer) => bufferChunks.push(chunk));
        req.on("end", () => resolve(Buffer.concat(bufferChunks)));
        req.on("error", (err) => reject(err));
      });
    
      const [ path = "", queryString = "" ] = req.url!.split("?");
      const method = req.method!.toLowerCase() as Handler["method"];
      const matchedHandler = this.handler[method]?.find((handler) => handler.pathRegExp.test(path));

      // handle preflight request
      if (method === "options") {
        res.writeHead(200, {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "*",
          "Access-Control-Allow-Headers": "*",
          "Access-Control-Allow-Credentials": "true",
          "Access-Control-Max-Age": "3600"
        });
        res.end();
      }
      // handle route
      else if (matchedHandler) {
        const matchedValues = matchedHandler.pathRegExp.exec(path)?.slice(1) ?? [];
        const params = Object.fromEntries(
          matchedHandler.pathKeys.map(({ name }, i) => [ name, matchedValues[i] ])
        );
        const query = new URLSearchParams(queryString);
    
        const response = await matchedHandler.handler({
          method,
          version: req.httpVersion,
          path,
          body: parseBody(bodyBuffer, contentType.parse(req.headers["content-type"]!).type),
          query: Object.fromEntries(query.entries()),
          params,
          headers: req.headers,
          cookie: {},
          store: {},
          extensions: {}
        });
    
        const { contentType: responseType, body } = prepareResponse(response.body);
    
        res.writeHead(response.status ?? (method === "post" ? 201 : 200), {
          "Content-Type": responseType,
          ...(response.headers ?? {})
        });
        res.end(body);
      }
      else {
        res.writeHead(404, { "Content-Type": "application/json" });
        res.end(JSON.stringify({
          statusCode: 404,
          message: `Cannot ${req.method!} ${req.url!}`,
          error: "Not Found"
        }));
      }
    });
  }

  register<T extends RouteGenericInterface>(
    method: Handler["method"],
    path: string,
    handler: (req: HttpRequest<T["Req"]>) => Promise<Partial<HttpResponse<T["Res"]>>>
  ) {
    const pathKeys: Key[] = [];
    
    this.handler[method].push({
      method,
      path,
      pathRegExp: pathToRegexp(path, pathKeys),
      pathKeys,
      handler
    });
  }

  bind(options: BootstrapOptions): void {
    this.server.listen(options.port, options.host, () => {
      console.log(`listening on port ${options.port}`);
    });
  }
}
