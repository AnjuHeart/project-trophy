import { createClient, RedisClientType } from 'redis';

const redisUrl = process.env.REDIS_URL;

const globalForRedis = global as unknown as {
  redisClient?: RedisClientType;
};

export const redis = globalForRedis.redisClient ?? createClient({ 
  url: redisUrl 
});

if (process.env.NODE_ENV !== 'production') {
  globalForRedis.redisClient = redis;
}

redis.on('error', (err) => {
  if (err.message.includes('ECONNRESET')) {
    console.warn('[Redis] Upstash closed idle connection. It will auto-reconnect.');
  } else {
    console.error('[Redis Error]', err);
  }
});

if (!redis.isOpen) {
  redis.connect().catch(console.error);
}