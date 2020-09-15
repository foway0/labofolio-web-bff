import { Sequelize, Model, DataTypes } from 'sequelize';
import { InitOptions, ModelAttributes } from 'sequelize/types/lib/model';
import { DB } from '../shared/types';

const TABLE_NAME = 'users';
const STATUS = {
  invalid: 'invalid',
  valid: 'valid',
};
const ROLE_ID = {
  viewer: 'viewer',
  admin: 'admin',
};

class Users extends Model<Users> {
  static attach(sequelize: Sequelize): Model {
    const attribute: ModelAttributes = {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      status: {
        type: DataTypes.ENUM(STATUS.invalid, STATUS.valid),
        allowNull: false,
        defaultValue: STATUS.valid,
      },
      role_id: {
        type: DataTypes.ENUM(ROLE_ID.viewer, ROLE_ID.admin),
        allowNull: false,
        defaultValue: ROLE_ID.viewer,
      },
      nickname: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      profile_url: {
        type: DataTypes.STRING,
        allowNull: true,
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
    };
    return this.init(attribute, options);
  }

  static associate(db: DB): void {
    Users.hasMany(db.blogs, {
      foreignKey: 'user_id',
      as: 'blogs',
      constraints: false,
    });
  }
}

const factory = (sequelize: Sequelize): Users => {
  return Users.attach(sequelize);
};

export { Users, factory };
