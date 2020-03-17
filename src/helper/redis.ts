import { Cluster, KeyType, ValueType } from 'ioredis';

class RedisHelper {
  static set(cache: Cluster, prefix: KeyType, obj: ValueType) {
    const stringify = JSON.stringify(obj);
    return cache.set(prefix, stringify);
  }

  static get(cache: Cluster, prefix: KeyType) {
    return cache.get(prefix).then(result => {
      if (result) return JSON.parse(result);
    });
  }

  static del(cache: Cluster, prefix: KeyType) {
    return cache.del(prefix);
  }
}

export { RedisHelper as redis };
