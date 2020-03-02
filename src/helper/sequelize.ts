import { Model, Sequelize } from 'sequelize';

class SequelizeHelper {
  static sync<M extends Model>(model?: { new (): M } & typeof Model) {
    return model?.sync();
  }

  static authenticate(sequelize: Sequelize) {
    return sequelize.authenticate();
  }
}

export { SequelizeHelper };
