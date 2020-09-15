import { Sequelize, Model, DataTypes } from 'sequelize';
import { InitOptions, ModelAttributes } from 'sequelize/types/lib/model';

const TABLE_NAME = 'temporary_images';

class TemporaryImages extends Model<TemporaryImages> {
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
      mime_type: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      image_path: {
        type: DataTypes.STRING(255).BINARY,
        allowNull: false,
      },
    };

    const options: InitOptions = {
      sequelize,
      modelName: TABLE_NAME,
      freezeTableName: true,
      timestamps: true,
      underscored: false,
      createdAt: 'created',
      updatedAt: false,
      charset: 'utf8',
    };
    return this.init(attribute, options);
  }
}

const factory = (sequelize: Sequelize): TemporaryImages => {
  return TemporaryImages.attach(sequelize);
};

export { TemporaryImages, factory };
