import { sequelize } from '@/infrastructure/db/connection';
import { Model, DataTypes } from 'sequelize';
/**
 * @class Category
 * @extends {Model} Sequelize Model
 * @description Represents Category entity in the database
 */
export class Category extends Model {
  public id!: number;
  public name!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  public deletedAt?: Date;
}

Category.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  sequelize,
  modelName: 'Category',
  tableName: 'categories',
  paranoid: true,
});
