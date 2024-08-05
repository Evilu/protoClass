import { fastify } from 'fastify';


import addRoutes from './connect';
import { fastifyConnectPlugin } from '@connectrpc/connect-fastify';




const server = fastify({
    http2: true,
    logger: true
});



server.register(fastifyConnectPlugin, {
    routes: addRoutes
}).then(async () => {
    await server.listen({ host: '0.0.0.0', port: 3232 });
    console.log('server is listening at', server.addresses());
});


