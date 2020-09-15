import { Sequelize, Model, DataTypes } from 'sequelize';
import { InitOptions, ModelAttributes } from 'sequelize/types/lib/model';

const TABLE_NAME = 'user_auth';
const TYPE = {
  google: 'google',
};

class UserAuth extends Model<UserAuth> {
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
      type: {
        type: DataTypes.ENUM(TYPE.google),
        allowNull: false,
      },
      passport_info: {
        type: DataTypes.JSON,
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
      updatedAt: 'modified',
      charset: 'utf8',
      indexes: [{ unique: true, fields: ['user_id', 'type'] }],
    };
    return this.init(attribute, options);
  }
}

const factory = (sequelize: Sequelize): UserAuth => {
  return UserAuth.attach(sequelize);
};

export { UserAuth, factory };
