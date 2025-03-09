import { Category } from "@/domain/entities/Category";
import { CategoryRepository } from "@/domain/repositories/category.repo";

/**
 * @class CategoryService
 * @description Service for Category entity
 */
export class CategoryService {
    private categoryRepository = new CategoryRepository();
  
    async createCategory(data: Category) {
      return this.categoryRepository.create(data);
    }
  
    async updateCategory(id: number, data: Partial<Category>) {
      return this.categoryRepository.update(id, data);
    }
  
    async deleteCategory(id: number) {
      return this.categoryRepository.delete(id);
    }
  
    async getCategoryById(id: number) {
      return this.categoryRepository.findById(id);
    }
}