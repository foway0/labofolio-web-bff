import { Model, Sequelize } from 'sequelize';
import { FindAndCountOptions, Identifier } from 'sequelize';

class SequelizeHelper {
  static sync<M extends Model>(model: { new (): M } & typeof Model) {
    return model.sync();
  }

  static async authenticate(sequelize: Sequelize) {
    return sequelize.authenticate();
  }

  static create<M extends Model>(
    model: { new (): M } & typeof Model,
    options: object
  ) {
    return Object(model.create(options));
  }

  static findByPk<M extends Model>(
    model: { new (): M } & typeof Model,
    options: Identifier
  ) {
    return Object(model.findByPk(options));
  }

  static findAndCountAll<M extends Model>(
    model: { new (): M } & typeof Model,
    options: FindAndCountOptions
  ) {
    return Object(model.findAndCountAll(options));
  }
}

export { SequelizeHelper as sequelize };
