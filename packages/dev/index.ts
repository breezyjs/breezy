import * as http from "http";
import { Handler, Request, Response } from "./types";
import { pathToRegexp, Key } from "path-to-regexp";
import { prepareResponse } from "./utils/prepareResponse";
import parseBody from "./utils/parseBody";
import contentType from "content-type";

const PORT = 3000;
const HOST = "127.0.0.1";

const handlers: Record<Handler["method"], Handler[]> = {
  get: [],
  put: [],
  post: [],
  delete: [],
  options: [],
  head: [],
  patch: [],
  trace: []
};

const server = http.createServer(async (req, res) => {
  const bodyBuffer = await new Promise<Buffer>((resolve, reject) => {
    const bufferChunks: Buffer[] = [];

    req.on("data", (chunk: Buffer) => bufferChunks.push(chunk));
    req.on("end", () => resolve(Buffer.concat(bufferChunks)));
    req.on("error", (err) => reject(err));
  });

  const [ path = "", queryString = "" ] = req.url!.split("?");
  const method = req.method!.toLowerCase() as Handler["method"];
  const matchedHandler = handlers[method]?.find((handler) => handler.pathRegExp.test(path));

  if (matchedHandler) {
    const matchedValues = matchedHandler.pathRegExp.exec(path)?.slice(1) ?? [];
    const params = Object.fromEntries(
      matchedHandler.pathKeys.map(({ name }, i) => [ name, matchedValues[i] ])
    );
    const query = new URLSearchParams(queryString);

    const response = matchedHandler.handler({
      method,
      uri: "",
      version: req.httpVersion,
      path,
      host: req.headers["host"]!,
      scheme: "",
      peerAddr: "",
      realIpRemoteAddr: "",
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
  } else {
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(JSON.stringify({
      statusCode: 404,
      message: `Cannot ${req.method!} ${req.url!}`,
      error: "Not Found"
    }));
  }
});

server.listen(PORT, HOST, () => {
  console.log(`listening on port ${PORT}`);
});

export function register<TReq extends Request, TRes extends Partial<Response>>(
  method: Handler["method"],
  path: string,
  handler: (req: TReq) => TRes
) {
  const pathKeys: Key[] = [];
  
  handlers[method].push({
    method,
    path,
    pathRegExp: pathToRegexp(path, pathKeys),
    pathKeys,
    handler: handler as any
  });
}

register("get", "/:id", (req) => {
  console.log(req);

  return {
    body: {
      message: `hello world from ${req.params.id}`
    }
  };
});
