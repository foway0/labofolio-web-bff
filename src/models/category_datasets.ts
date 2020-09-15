import { Sequelize, Model, DataTypes } from 'sequelize';
import { InitOptions, ModelAttributes } from 'sequelize';

const TABLE_NAME = 'category_datasets';

class CategoryDatasets extends Model<CategoryDatasets> {
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
      category_list: {
        type: DataTypes.JSON,
        allowNull: false,
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
      indexes: [{ unique: true, fields: ['user_id'] }],
    };
    return this.init(attribute, options);
  }
}

const factory = (sequelize: Sequelize): CategoryDatasets => {
  return CategoryDatasets.attach(sequelize);
};

export { CategoryDatasets, factory };
