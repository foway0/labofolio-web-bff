const debug = process.env.DEBUG
  ? require('debug')('labofolio:context')
  : () => {};

import { Sequelize } from 'sequelize';

import { MysqlConfig, DB } from './shared/types';
import models from './models';
import { SequelizeHelper } from './helper';

class Context {
  private _mysql?: Sequelize;
  private _db: DB;

  constructor() {
    this._db = {};
    debug('Context is initialized');
  }

  public async initStore(config: MysqlConfig): Promise<void> {
    this._mysql = new Sequelize(
      config.database,
      config.username,
      config.password,
      config.options
    );

    await SequelizeHelper.authenticate(this._mysql).then(() => {
      debug('mysql connected');
    });
  }

  public initModels() {
    // set
    if (this._mysql instanceof Sequelize) {
      this._db.users = models.users.factory(this._mysql);
      this._db.blogs = models.blogs.factory(this._mysql);
    }
  }

  public async syncModels() {
    // sync
    await SequelizeHelper.sync(this._db.users);
    await SequelizeHelper.sync(this._db.blogs);
  }
}

export default new Context();
