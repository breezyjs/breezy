import Fastify from "fastify";
import { BootstrapOptions } from "./types";

export const fastify = Fastify({
  logger: true
});

export default async function bootstrap(
  factory: () => Promise<BootstrapOptions>
) {
  const options = await factory();

  fastify.listen(options, (err, address) => options.onListen?.(err, address));
}

fastify.addHook("onReady", (done) => {
  console.log("ready");
});
