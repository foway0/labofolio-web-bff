import { Cluster, KeyType, ValueType } from 'ioredis';

class RedisHelper {
  static async set(cache: Cluster, prefix: KeyType, obj: ValueType) {
    const stringify = JSON.stringify(obj);
    return cache.set(prefix, stringify);
  }

  static async get(cache: Cluster, prefix: KeyType): Promise<any> {
    return cache.get(prefix).then(result => {
      if (result) return JSON.parse(result);
    });
  }
}

export { RedisHelper as redis };
