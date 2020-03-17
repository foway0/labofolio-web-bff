const debug = process.env.DEBUG
  ? require('debug')('labofolio:context')
  : () => {};

import { Sequelize } from 'sequelize';
import { Cluster } from 'ioredis';

import { Config, DB } from './shared/types';
import models from './models';
import { sequelize } from './helper';

class Context {
  private readonly _mysql: Sequelize;
  private readonly _db: DB;
  private readonly _cache: Cluster;

  constructor(mysql: Sequelize, cache: Cluster) {
    this._mysql = mysql;
    this._cache = cache;
    this._db = {};
    debug('Context is initialized');
  }

  public async initStore(): Promise<void> {
    await sequelize.authenticate(this._mysql).then(() => {
      debug('mysql connected');
    });
  }

  public initModels() {
    // set
    Object.entries(models).forEach(([key, value]) => {
      this._db[key] = value.factory(this._mysql);
    });
  }

  public async syncModels() {
    // sync
    await Promise.all([
      sequelize.sync(this._db.users),
      sequelize.sync(this._db.blogs),
      sequelize.sync(this._db.blog_snapshots)
    ]);
  }

  public async initCache() {
    this._cache.on('connect', () => {
      debug('redis connected');
    });

    this._cache.on('error', error => {
      debug(error);
    });

    this._cache.on('ready', () => {
      debug('REDIS READY');
    });
  }

  public getMysql() {
    return this._mysql;
  }

  public getDB() {
    return this._db;
  }

  public getCache() {
    return this._cache;
  }
}

export { Context };
export default (config: Config) => {
  const { mysql, redis } = config;
  const conn = new Sequelize(
    mysql.database,
    mysql.username,
    mysql.password,
    mysql.options
  );
  const cache = new Cluster(redis);

  return new Context(conn, cache);
};
