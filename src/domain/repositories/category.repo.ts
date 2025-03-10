import { Category } from "@/domain/entities/Category";
import IBaseModel from "@/domain/interfaces/IBaseModel";
import { Op } from "sequelize";

/**
 * @class CategoryRepository
 * @extends {IBaseModel<Category>}
 * @description Repository for Category entity
 */
export class CategoryRepository implements IBaseModel<Category> {
  /**
   * Repository function for creating a category
   * @param {Category} data - Category data
   * @returns {Promise<Category>}
   */
  async create(data: Category): Promise<Category> {
    return Category.create({ ...data });
  }
  /**
   * Repository function for updating a category
   * @param {number} id - Category id
   * @param {Partial<Category>} data - Category data
   * @returns {Promise<Category | null>}
   */
  async update(id: number, data: Partial<Category>): Promise<Category | null> {
    const category = await Category.findByPk(id);
    if (category) {
      await category.update(data);
    }
    return category;
  }
  /**
   * Repository function for deleting a category
   * @description This method updates the deletedAt field of the category to the current date
   * @param {number} id - Category id
   * @returns {Promise<boolean>}
   */
  async delete(id: number): Promise<boolean> {
    const category = await Category.findByPk(id);
    if (category) {
      await category.update({ deletedAt: new Date() });
      return true;
    }
    return false;
  }
  /**
   * Repository function to find a category by id
   * @param {number} id - Category id
   * @returns {Promise<Category | null>}
   */
  async findById(id: number): Promise<Category | null> {
    return Category.findByPk(id);
  }
  /**
   * Repository function to find all categories
   * @returns {Promise<Category[]>}
   */
  async findAll(): Promise<Category[]> {
    return Category.findAll();
  }
  /**
   * Repository function to find a category by its name
   * @param {string} name - Category name
   * @returns {Promise<Category | null>}
   */
  async findCategoryByName(name: string): Promise<Category | null> {
    return Category.findOne({ 
      where: { 
        name: {
          [Op.iLike]: `%${name}%`
        }
      }
    });
  }
}
