import fp from 'fastify-plugin';
import { FastifyPluginAsync } from 'fastify';
import underPressure from '@fastify/under-pressure';

const underPressurePlugin: FastifyPluginAsync = async (fastify) => {
  await fastify.register(underPressure, {
    maxEventLoopDelay: 1000,
    maxHeapUsedBytes: 100000000,
    maxRssBytes: 100000000,
    maxEventLoopUtilization: 0.98,
    message: 'Under pressure!',
    retryAfter: 50,
    healthCheck: async () => {
      // Custom health check logic
      return { status: 'ok' };
    },
    healthCheckInterval: 5000
  });

  fastify.log.info('✅ Under pressure monitoring enabled');
};

export default fp(underPressurePlugin, {
  name: 'under-pressure-plugin'
});