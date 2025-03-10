import { Category } from "@/domain/entities/Category";
import { HttpCodes } from "@/domain/enums/httpCodes";
import IHttpResponse from "@/domain/interfaces/IHttpResponse";
import { CategoryRepository } from "@/domain/repositories/category.repo";

/**
 * @class CategoryService
 * @description Service for Category entity
 */
export class CategoryService {
  private _categoryRepository: CategoryRepository;

  constructor() {
    this._categoryRepository = new CategoryRepository();
  }
  /**
   * Service to create a category
   * @param {Category} data - Category data
   * @returns {Promise<IHttpResponse<Category>>}
   */
  public async createCategory(data: Category): Promise<IHttpResponse<Category>> {
    // check if the category already exists
    const categoryExists = await this._categoryRepository.findCategoryByName(data.name);
    if (!!categoryExists) {
      const response: IHttpResponse<Category> = {
        status: HttpCodes.CONFLICT,
        message: 'Category already exists',
        data: categoryExists,
      };
      return response;
    };
    // create the category
    const category = await this._categoryRepository.create(data);
    const response: IHttpResponse<Category> = {
      status: HttpCodes.CREATED,
      message: 'Category created successfully',
      data: category,
    };
    return response;
  }
  /**
   * Service to update a category
   * @param {number} id - Category id
   * @param {Partial<Category>} data - Category data
   * @returns {Promise<IHttpResponse<Category | null>>}
   */
  public async updateCategory(id: number, data: Partial<Category>) {
    const category = await this._categoryRepository.findById(id);
    if (!category) {
      const response: IHttpResponse<null> = {
        status: HttpCodes.BAD_REQUEST,
        message: 'Category not found',
        data: null,
      };
      return response;
    }
    // update the category
    const categoryUpdated = await this._categoryRepository.update(id, data);
    const response: IHttpResponse<Category> = {
      status: categoryUpdated ? HttpCodes.OK : HttpCodes.INTERNAL_SERVER_ERROR,
      message: categoryUpdated ? 'Category updated successfully' : 'Error updating category',
      data: category,
    };
    return response;
  }
  /**
   * Service to delete a category
   * @param {number} id - Category id
   * @returns {Promise<IHttpResponse<null>>}
   * @description This method updates the deletedAt field of the category
   */
  public async deleteCategory(id: number) {
    const category = await this._categoryRepository.findById(id);
    if (!category) {
      const response: IHttpResponse<null> = {
        status: HttpCodes.BAD_REQUEST,
        message: 'Category not found',
        data: null,
      };
      return response;
    }
    // delete the category
    const categoryDeleted = await this._categoryRepository.delete(id);
    const response: IHttpResponse<null> = {
      status: categoryDeleted ? HttpCodes.OK : HttpCodes.INTERNAL_SERVER_ERROR,
      message: categoryDeleted ? 'Category deleted successfully' : 'Error deleting category',
      data: null,
    };
    return response;
  }
  /**
   * Service to get a category by id
   * @param {number} id - Category id
   * @returns {Promise<IHttpResponse<Category | null>>}
   */
  public async getCategoryById(id: number) {
    const category = await this._categoryRepository.findById(id);
    if (!category) {
      const response: IHttpResponse<null> = {
        status: HttpCodes.BAD_REQUEST,
        message: 'Category not found',
        data: null,
      };
      return response;
    }
    const response: IHttpResponse<Category> = {
      status: HttpCodes.OK,
      message: 'Category found',
      data: category,
    };
    return response;
  }
  /**
   * Service to get all categories
   * @returns {Promise<IHttpResponse<Category[]>>}
   * @description This method retrieves all categories
   */
  public async listCategories() {
    const categories = await this._categoryRepository.findAll();
    const response: IHttpResponse<Category[]> = {
      status: HttpCodes.OK,
      message: categories.length > 0 ? 'Categories retrieved successfully' : 'No categories found',
      data: categories,
    };
    return response;
  }
}