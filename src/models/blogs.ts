import { Sequelize, Model, DataTypes } from 'sequelize';
import { InitOptions, ModelAttributes } from 'sequelize/types/lib/model';
import { DB } from '../shared/types';

const TABLE_NAME = 'blogs';
const STATUS = {
  invalid: 'invalid',
  valid: 'valid',
};

class Blogs extends Model<Blogs> {
  static attach(sequelize: Sequelize): Model {
    const attribute: ModelAttributes = {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      category_id: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
      },
      user_id: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
      },
      status: {
        type: DataTypes.ENUM(STATUS.invalid, STATUS.valid),
        allowNull: false,
        defaultValue: STATUS.valid,
      },
      subject: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      content_md: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      content_html: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      content_text: {
        type: DataTypes.TEXT,
        allowNull: false,
        comment: 'search only',
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
      indexes: [
        {
          type: 'FULLTEXT',
          fields: ['subject', 'content_text'],
          parser: 'ngram',
        },
      ],
    };
    return this.init(attribute, options);
  }

  static associate(db: DB): void {
    Blogs.hasMany(db.blog_snapshots, {
      foreignKey: 'blog_id',
      as: 'blog_snapshot',
      constraints: false,
    });
  }
}

const factory = (sequelize: Sequelize): Blogs => {
  return Blogs.attach(sequelize);
};

export { Blogs, factory };
