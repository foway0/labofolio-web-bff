import { Cluster, KeyType, ValueType } from 'ioredis';

class RedisHelper {
  static async set(prefix: KeyType, obj: ValueType, cache?: Cluster) {
    const stringify = JSON.stringify(obj);
    return cache?.set(prefix, stringify);
  }

  static async get(prefix: KeyType, cache?: Cluster): Promise<any> {
    return cache?.get(prefix).then(result => {
      if (result) return JSON.parse(result);
    });
  }
}

export { RedisHelper as redis };
