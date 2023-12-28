import Fastify from 'fastify';
import { BootstrapOptions } from './types';
const fastify = Fastify({
  logger: true
});

export default async function bootstrap(
  factory: () => Promise<BootstrapOptions>
) {
  const options = await factory();

  fastify.listen(options, (err, address) => {
    if (err) throw err
    // Server is now listening on ${address}
  })
}