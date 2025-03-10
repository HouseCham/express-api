import { Model, DataTypes } from 'sequelize';
import { Category } from '@/domain/entities/Category';
import { sequelize } from '@/infrastructure/db/connection';

/**
 * @class Movie
 * @extends {Model} Sequelize Model
 * @description Represents Movie entity in the database
 */
export class Movie extends Model {
  [x: string]: any;
  public id!: number;
  public title!: string;
  public description!: string;
  public categoryId!: number;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  public deletedAt?: Date;
}

Movie.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  categoryId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Category,
      key: 'id',
    },
  },
}, {
  sequelize,
  modelName: 'Movie',
  tableName: 'movies',
});

Movie.belongsTo(Category, { foreignKey: 'categoryId' });
Category.hasMany(Movie, { foreignKey: 'categoryId' });
