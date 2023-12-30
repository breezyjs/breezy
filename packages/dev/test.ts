import { HttpServer } from ".";

const PORT = 3000;
const HOST = "127.0.0.1";

const server = new HttpServer();

server.register<{
  Req: {
    Params: {
      id: string
    }
  },
  Res: Record<string, unknown>
}>("get", "/:id", async (req) => {
  console.log(req);

  return {
    body: {
      message: `hello world from ${req.params.id}`
    }
  };
});

server.bind({
  host: HOST,
  port: PORT
});
