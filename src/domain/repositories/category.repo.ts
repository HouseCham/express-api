import { Category } from "@/domain/entities/Category";
import { IBaseModel } from "@/domain/interfaces/IBaseModel";

/**
 * @class CategoryRepository
 * @extends {IBaseModel<Category>}
 * @description Repository for Category entity
 */
export class CategoryRepository implements IBaseModel<Category> {
  async create(data: Category): Promise<Category> {
    return Category.create({ ...data });
  }

  async update(id: number, data: Partial<Category>): Promise<Category | null> {
    const category = await Category.findByPk(id);
    if (category) {
      await category.update(data);
    }
    return category;
  }

  async delete(id: number): Promise<boolean> {
    const deleted = await Category.destroy({ where: { id } });
    return deleted > 0;
  }

  async findById(id: number): Promise<Category | null> {
    return Category.findByPk(id);
  }

  async findAll(): Promise<Category[]> {
    return Category.findAll();
  }
}
