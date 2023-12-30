import { BootstrapOptions, HttpServer } from "@breezy/dev";

export const server = new HttpServer();

export default async function bootstrap(
  factory: () => Promise<BootstrapOptions>
) {
  const options = await factory();

  server.bind(options);
}
