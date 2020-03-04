import { Sequelize, Model, DataTypes } from 'sequelize';
import { InitOptions, ModelAttributes } from 'sequelize';

const TABLE_NAME = 'blog_snapshots';

class BlogSnapshots extends Model<BlogSnapshots> {
  static attach(sequelize: Sequelize) {
    const attribute: ModelAttributes = {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      blog_id: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false
      },
      subject: {
        type: DataTypes.STRING,
        allowNull: false
      },
      content_md: {
        type: DataTypes.TEXT,
        allowNull: true
      },
      content_html: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      content_text: {
        type: DataTypes.TEXT,
        allowNull: false,
        comment: 'search only'
      }
    };

    const options: InitOptions = {
      sequelize,
      modelName: TABLE_NAME,
      timestamps: true,
      underscored: false,
      paranoid: true,
      createdAt: 'created',
      updatedAt: 'modified',
      charset: 'utf8',
      indexes: [
        {
          type: 'FULLTEXT',
          fields: ['subject', 'content_text'],
          parser: 'ngram'
        }
      ]
    };
    this.init(attribute, options);
  }
}

const factory = (sequelize: Sequelize) => {
  BlogSnapshots.attach(sequelize);

  return BlogSnapshots;
};

export { BlogSnapshots, factory };
