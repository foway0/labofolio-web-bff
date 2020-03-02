import { Model } from 'sequelize';

class SequelizeHelper {
  static sync<M extends Model>(model?: { new (): M } & typeof Model) {
    return model?.sync();
  }
}

export { SequelizeHelper };
