const debug = process.env.DEBUG
  ? require('debug')('labofolio:context')
  : () => {};

import { Sequelize } from 'sequelize';
import { Cluster } from 'ioredis';

import { MysqlConfig, RedisConfig, DB } from './shared/types';
import models from './models';
import { sequelize } from './helper';

class Context {
  private _mysql?: Sequelize;
  private readonly _db: DB;
  private _cache?: Cluster;

  constructor() {
    this._db = {};
    debug('Context is initialized');
  }

  public async initStore(config: MysqlConfig): Promise<void> {
    this._mysql = await new Sequelize(
      config.database,
      config.username,
      config.password,
      config.options
    );

    await sequelize.authenticate(this._mysql).then(() => {
      debug('mysql connected');
    });
  }

  public initModels() {
    // set
    Object.entries(models).forEach(([key, value]) => {
      if (this._mysql instanceof Sequelize) {
        this._db[key] = value.factory(this._mysql);
      }
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

  public async initCache(config: RedisConfig[]) {
    this._cache = await new Cluster(config);

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
    return this?._cache;
  }
}

export default new Context();
