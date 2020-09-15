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

  public initModels(): void {
    // set
    Object.entries(models).forEach(([tableName, value]) => {
      this._db[tableName] = value.factory(this._mysql);
    });

    Object.keys(this._db).forEach((tableName) => {
      if ('associate' in this._db[tableName]) {
        this._db[tableName].associate(this._db);
      }
    });
  }

  public async syncModels(): Promise<void> {
    // sync
    await Promise.all([
      sequelize.sync(this._db.users),
      sequelize.sync(this._db.user_auth),
      sequelize.sync(this._db.blogs),
      sequelize.sync(this._db.blog_snapshots),
      sequelize.sync(this._db.categories),
      sequelize.sync(this._db.category_datasets),
      sequelize.sync(this._db.temporary_images),
    ]);
  }

  public async initCache(): Promise<void> {
    this._cache.on('connect', () => {
      debug('redis connected');
    });

    this._cache.on('error', (error) => {
      debug(error);
    });

    this._cache.on('ready', () => {
      debug('REDIS READY');
    });
  }

  public getMysql(): Sequelize {
    return this._mysql;
  }

  public getDB(): DB {
    return this._db;
  }

  public getCache(): Cluster {
    return this._cache;
  }
}

export { Context };
export default (config: Config): Context => {
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
