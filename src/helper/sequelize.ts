import { Model, Sequelize } from 'sequelize';
import { FindAndCountOptions } from 'sequelize';

class SequelizeHelper {
  static sync<M extends Model>(model?: { new (): M } & typeof Model) {
    return model?.sync();
  }

  static async authenticate(sequelize?: Sequelize) {
    return sequelize?.authenticate();
  }

  static create<M extends Model>(
    model?: { new (): M } & typeof Model,
    options?: object
  ) {
    return model?.create(options);
  }

  static findAndCountAll<M extends Model>(
    model?: { new (): M } & typeof Model,
    options?: FindAndCountOptions
  ) {
    return model?.findAndCountAll(options);
  }
}

export { SequelizeHelper };
