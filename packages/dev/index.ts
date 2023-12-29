import * as http from "http";
import parseHeaders from "./utils/parseHeaders";

const PORT = 3000;

const server = http.createServer((req, res) => {
  const headers = parseHeaders(req.rawHeaders);
  let bodyBuffer = Buffer.alloc(0);
  
  console.log(headers);

  req.on("data", (chunk: Buffer) => {
    bodyBuffer = Buffer.concat([ bodyBuffer, chunk ]);
  });

  req.on("end", () => {
    // console.log(data)
  });

  res.writeHead(200, { "Content-Type": "text/plain" });
  res.end("hello world");
});

server.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
