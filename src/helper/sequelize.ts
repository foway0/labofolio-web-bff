import { Model, Sequelize } from 'sequelize';
import { FindAndCountOptions, Identifier, UpdateOptions } from 'sequelize';

class SequelizeHelper {
  static sync<M extends Model>(
    model: { new (): M } & typeof Model
  ): Promise<M> {
    return model.sync();
  }

  static async authenticate(sequelize: Sequelize): Promise<void> {
    return sequelize.authenticate();
  }

  static create<M extends Model>(
    model: { new (): M } & typeof Model,
    options: Record<string, any>
  ): Promise<Record<string, any>> {
    return Object(model.create(options));
  }

  static findByPk<M extends Model>(
    model: { new (): M } & typeof Model,
    options: Identifier
  ): Promise<M> {
    return Object(model.findByPk(options));
  }

  static findAndCountAll<M extends Model>(
    model: { new (): M } & typeof Model,
    options: FindAndCountOptions
  ): Promise<M> {
    return Object(model.findAndCountAll(options));
  }

  static update<M extends Model>(
    model: { new (): M } & typeof Model,
    values: Record<string, any>,
    options: UpdateOptions
  ): Promise<M> {
    return Object(model.update(values, options));
  }
}

export { SequelizeHelper as sequelize };
