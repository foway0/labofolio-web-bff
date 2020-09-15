import { Sequelize, Model, DataTypes } from 'sequelize';
import { InitOptions, ModelAttributes } from 'sequelize';

const TABLE_NAME = 'categories';

class Categories extends Model<Categories> {
  static attach(sequelize: Sequelize): Model {
    const attribute: ModelAttributes = {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      user_id: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
    };

    const options: InitOptions = {
      sequelize,
      modelName: TABLE_NAME,
      timestamps: true,
      underscored: false,
      createdAt: 'created',
      updatedAt: 'modified',
      charset: 'utf8',
    };
    return this.init(attribute, options);
  }
}

const factory = (sequelize: Sequelize): Categories => {
  return Categories.attach(sequelize);
};

export { Categories, factory };
