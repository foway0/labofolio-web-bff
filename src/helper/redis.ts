import { Cluster, KeyType, Ok } from 'ioredis';

class RedisHelper {
  static set(
    cache: Cluster,
    prefix: KeyType,
    obj: Record<string, any>
  ): Promise<Ok | null> {
    const stringify = JSON.stringify(obj);
    return cache.set(prefix, stringify);
  }

  static get(cache: Cluster, prefix: KeyType): Promise<any> {
    return cache.get(prefix).then((result) => {
      if (result) return JSON.parse(result);
    });
  }

  static del(cache: Cluster, prefix: KeyType): Promise<number> {
    return cache.del(prefix);
  }
}

export { RedisHelper as redis };
