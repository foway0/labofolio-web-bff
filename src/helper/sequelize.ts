import { Model, Sequelize } from 'sequelize';

class SequelizeHelper {
  static sync<M extends Model>(model?: { new (): M } & typeof Model) {
    return model?.sync();
  }

  static async authenticate(sequelize?: Sequelize) {
    return sequelize?.authenticate();
  }
}

export { SequelizeHelper };
