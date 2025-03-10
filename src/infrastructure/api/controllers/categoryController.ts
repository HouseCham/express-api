import { Request, Response } from 'express';
import { CategoryService } from "@/application/services/CategoryService";
import { HttpCodes } from "@/domain/enums/httpCodes";
import { createErrorResponse } from "@/infrastructure/utils/errors.utils";
import { Category } from '@/domain/entities/Category';

export default class CategoryController {
    private _categoryService: CategoryService;

    constructor() {
        this._categoryService = new CategoryService();
    }
    /**
     * Controller to get all categories
     * @param {Request} req - Request object
     * @param {Response} res - Response object
     * @returns {Promise<HttpResponse<Category[]>>}
     */
    public getAllCategories = async (req: Request, res: Response) => {
        console.log('Category controller: getAllCategories called', new Date());
        try {
            const response = await this._categoryService.listCategories();
            res.status(response.status).json(response);
        } catch (error) {
            console.error(`Error getting all categories ${new Date()}:`, error);
            res.status(HttpCodes.INTERNAL_SERVER_ERROR).json(createErrorResponse());
        };
    }
    /**
     * Controller to get a category by id
     * @param {Request} req - Request object
     * @param {Response} res - Response object
     * @returns {Promise<HttpResponse<Category>>}
     */
    public getCategoryById = async (req: Request, res: Response) => {
        console.log('Category controller: getCategoryById called', new Date());
        try {
            const { id } = req.params;
            const response = await this._categoryService.getCategoryById(Number(id));
            res.status(response.status).json(response);
        } catch (error) {
            console.error(`Error getting a category ${new Date()}:`, error);
            res.status(HttpCodes.INTERNAL_SERVER_ERROR).json(createErrorResponse());
        }
    }
    /**
     * Controller to create a category
     * @param {Request} req - Request object
     * @param {Response} res - Response object
     * @returns {Promise<HttpResponse<Category>>}
     */
    public createCategory = async (req: Request, res: Response) => {
        console.log('Category controller: createCategory called', new Date());
        try {
            const category: Category = req.body;
            const response = await this._categoryService.createCategory(category);
            res.status(response.status).json(response);
        } catch (error) {
            console.error(`Error creating a category ${new Date()}:`, error);
            res.status(HttpCodes.INTERNAL_SERVER_ERROR).json(createErrorResponse());
        }
    }
    /**
     * Controller to update a category
     * @param {Request} req - Request object
     * @param {Response} res - Response object
     * @returns {Promise<HttpResponse<Category>>}
     */
    public updateCategory = async (req: Request, res: Response) => {
        console.log('Category controller: updateCategory called', new Date());
        try {
            const category: Category = req.body;
            const response = await this._categoryService.updateCategory(category);
            res.status(response.status).json(response);
        } catch (error) {
            console.error(`Error updating a category ${new Date()}:`, error);
            res.status(HttpCodes.INTERNAL_SERVER_ERROR).json(createErrorResponse());
        }
    }
    /**
     * Controller to delete a category
     * @param {Request} req - Request object
     * @param {Response} res - Response object
     * @returns {Promise<HttpResponse<null>>}
     */
    public deleteCategory = async (req: Request, res: Response) => {
        console.log('Category controller: deleteCategory called', new Date());
        try {
            const { id } = req.params;
            const response = await this._categoryService.deleteCategory(Number(id));
            res.status(response.status).json(response);
        } catch (error) {
            console.error(`Error deleting a category ${new Date()}:`, error);
            res.status(HttpCodes.INTERNAL_SERVER_ERROR).json(createErrorResponse());
        }
    }
};