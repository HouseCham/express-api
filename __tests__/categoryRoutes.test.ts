import request from 'supertest';
import express from 'express';
import apiRoutes from '../src/infrastructure/api/routes';
import IHttpResponse from "../src/domain/interfaces/IHttpResponse";
import CategoryDTO from "../src/application/dto/CategoryDTO";
import { sequelize } from '../src/infrastructure/db/connection';
import { Category } from "../src/domain/entities/Category";
import IBadRequestError from '../src/domain/interfaces/IBadRequestError';
import { Movie } from "../src/domain/entities/Movie";

const app = express();
app.use(express.json());
app.use(apiRoutes);

afterAll(async () => {
    await sequelize.close();  // Close DB connection after tests
});

let categoryCreatedId: number;

/**
 * GET CATEGORY TESTS
 * @description Test the GET /categories route
 */
describe('GET /categories API Endpoint', () => {

    // 🟢 Test 1: Get all categories (Success)
    it('should return a list of categories', async () => {
        const response = await request(app).get('/categories');
        const responseBody = response.body as IHttpResponse<CategoryDTO[]>;

        expect(response.status).toBe(200);
        expect(responseBody).toHaveProperty('status', 200);
        expect(responseBody).toHaveProperty('message', 'Categories retrieved successfully');
        expect(Array.isArray(responseBody.data)).toBe(true);

        if (responseBody.data.length > 0) {
            const category = responseBody.data[0];
            expect(category).toMatchObject({
                id: expect.any(Number),
                name: expect.any(String)
            });
        }
    });

    // 🟢 Test 3: Get category by valid ID (Success)
    it('should return a category for a valid ID', async () => {
        const response = await request(app).get('/categories/1');
        const responseBody = response.body as IHttpResponse<CategoryDTO>;

        expect(response.status).toBe(200);
        expect(responseBody).toHaveProperty('status', 200);
        expect(responseBody).toHaveProperty('message', 'Category retrieved successfully');
        expect(responseBody).toHaveProperty('data');

        const category = responseBody.data;
        expect(category).toMatchObject({
            id: 1,
            name: expect.any(String)
        });
    });

    // ❌ Test 4: Get category by non-existing ID (404 Not Found)
    it('should return 404 for non-existing category ID', async () => {
        const response = await request(app).get('/categories/9999');
        const responseBody = response.body as IHttpResponse<null>;

        expect(response.status).toBe(404);
        expect(responseBody).toHaveProperty('status', 404);
        expect(responseBody).toHaveProperty('message', 'Category not found');
    });

    // ❌ Test 5: Get category by invalid ID (400 Bad Request)
    it('should return 400 for invalid category ID', async () => {
        const response = await request(app).get('/categories/invalid-id');
        const responseBody = response.body as IHttpResponse<null>;

        expect(response.status).toBe(400);
        expect(responseBody).toHaveProperty('status', 400);
        expect(responseBody).toHaveProperty('message', 'Invalid category ID');
    });
});

/**
 * POST CATEGORY TESTS
 * @description Test the POST /categories route
 */
describe('POST /categories API Endpoint', () => {
    // 🟢 Test 1: Create a category successfully
    it('should return 201 for successful category creation', async () => {
        const newCategory = { name: 'Science Fiction' };
        const response = await request(app).post('/categories').send(newCategory);
        const responseBody = response.body as IHttpResponse<CategoryDTO>;

        expect(response.status).toBe(201);
        expect(responseBody).toHaveProperty('status', 201);
        expect(responseBody).toHaveProperty('message', 'Category created successfully');
        expect(responseBody).toHaveProperty('data');

        const category = responseBody.data;
        categoryCreatedId = category.id;
        expect(category).toMatchObject({
            id: expect.any(Number),
            name: 'Science Fiction'
        });
    });

    // ❌ Test 2: Create a category with missing name
    it('should return 400 for missing name', async () => {
        const invalidCategory = {};
        const response = await request(app).post('/categories').send(invalidCategory);
        const responseBody = response.body as IHttpResponse<IBadRequestError[]>;

        expect(response.status).toBe(400);
        expect(responseBody).toHaveProperty('status', 400);
        expect(responseBody).toHaveProperty('message', 'Validation error');
        expect(Array.isArray(responseBody.data)).toBe(true);

        if (responseBody.data.length > 0) {
            const error = responseBody.data[0];
            expect(error).toMatchObject({
                path: 'name',
                message: 'Required'
            });
        }
    });

    // ❌ Test 3: Create a category with an empty name
    it('should return 400 for empty name', async () => {
        const invalidCategory = { name: '' };
        const response = await request(app).post('/categories').send(invalidCategory);
        const responseBody = response.body as IHttpResponse<IBadRequestError[]>;

        expect(response.status).toBe(400);
        expect(responseBody).toHaveProperty('status', 400);
        expect(responseBody).toHaveProperty('message', 'Validation error');
        expect(Array.isArray(responseBody.data)).toBe(true);

        if (responseBody.data.length > 0) {
            const error = responseBody.data[0];
            expect(error).toMatchObject({
                path: 'name',
                message: 'Category name is required'
            });
        }
    });

    // ❌ Test 4: Create a category with a duplicate name
    it('should return 409 for duplicate category name', async () => {
        const duplicateCategory = { name: 'Science Fiction' };
        const response = await request(app).post('/categories').send(duplicateCategory);
        const responseBody = response.body as IHttpResponse<null>;

        expect(response.status).toBe(409);
        expect(responseBody).toHaveProperty('status', 409);
        expect(responseBody).toHaveProperty('message', 'Category already exists');
    });

    // ❌ Test 5: Create a category with invalid data type for name
    it('should return 400 for invalid name data type', async () => {
        const invalidCategory = { name: 123 };  // Invalid data type (number instead of string)
        const response = await request(app).post('/categories').send(invalidCategory);
        const responseBody = response.body as IHttpResponse<IBadRequestError[]>;

        expect(response.status).toBe(400);
        expect(responseBody).toHaveProperty('status', 400);
        expect(responseBody).toHaveProperty('message', 'Validation error');
        expect(Array.isArray(responseBody.data)).toBe(true);

        if (responseBody.data.length > 0) {
            const error = responseBody.data[0];
            expect(error).toMatchObject({
                path: 'name',
                message: 'Expected string, received number'
            });
        }
    });
});

/**
 * PUT CATEGORY TESTS
 * @description Test the PUT /categories/:id route
 */
describe('PUT /categories/:id API Endpoint', () => {

    // 🟢 Test 1: Update a category successfully
    it('should return 200 for successful category update', async () => {
        const updatedCategory = { id: categoryCreatedId, name: 'Updated Category' };
        const response = await request(app).put('/categories').send(updatedCategory);
        const responseBody = response.body as IHttpResponse<CategoryDTO>;

        expect(response.status).toBe(200);
        expect(responseBody).toHaveProperty('status', 200);
        expect(responseBody).toHaveProperty('message', 'Category updated successfully');
        expect(responseBody).toHaveProperty('data');

        const category = responseBody.data;
        expect(category).toMatchObject({
            id: categoryCreatedId,
            name: 'Updated Category'
        });
    });

    // ❌ Test 2: Update a non-existing category
    it('should return 404 for non-existing category ID', async () => {
        const updatedCategory = { id: 9999, name: 'New Category' };
        const response = await request(app).put('/categories').send(updatedCategory);
        const responseBody = response.body as IHttpResponse<null>;

        expect(response.status).toBe(404);
        expect(responseBody).toHaveProperty('status', 404);
        expect(responseBody).toHaveProperty('message', 'Category not found');
        expect(responseBody.data).toBeNull();
    });

    // ❌ Test 3: Update a category with invalid ID
    it('should return 400 for invalid category ID', async () => {
        const updatedCategory = { id: "invalid-id", name: 'Invalid ID Category' };
        const response = await request(app).put('/categories').send(updatedCategory);
        const responseBody = response.body as IHttpResponse<IBadRequestError[]>;

        expect(response.status).toBe(400);
        expect(responseBody).toHaveProperty('status', 400);
        expect(responseBody).toHaveProperty('message', 'Validation error');
        expect(Array.isArray(responseBody.data)).toBe(true);
    });

    // ❌ Test 4: Update a category with missing name
    it('should return 400 for missing name', async () => {
        const response = await request(app).put('/categories').send({});
        const responseBody = response.body as IHttpResponse<IBadRequestError[]>;

        expect(response.status).toBe(400);
        expect(responseBody).toHaveProperty('status', 400);
        expect(responseBody).toHaveProperty('message', 'Validation error');
        expect(Array.isArray(responseBody.data)).toBe(true);
    });

    // ❌ Test 5: Update a category with empty name
    it('should return 400 for empty name', async () => {
        const updatedCategory = { name: '' };
        const response = await request(app).put('/categories').send(updatedCategory);
        const responseBody = response.body as IHttpResponse<IBadRequestError[]>;

        expect(response.status).toBe(400);
        expect(responseBody).toHaveProperty('status', 400);
        expect(responseBody).toHaveProperty('message', 'Validation error');
        expect(Array.isArray(responseBody.data)).toBe(true);
    });

    // ❌ Test 6: Update a category with a duplicate name
    it('should return 409 for duplicate category name', async () => {
        const duplicateCategory = { id: categoryCreatedId, name: 'Terror' };  // Assuming 'Terror' already exists
        const response = await request(app).put('/categories').send(duplicateCategory);
        const responseBody = response.body as IHttpResponse<Category>;

        expect(response.status).toBe(409);
        expect(responseBody).toHaveProperty('status', 409);
        expect(responseBody).toHaveProperty('message', 'Category already exists');
        expect(responseBody.data).toBeInstanceOf(Object);
        expect(responseBody.data).toMatchObject({
            id: expect.any(Number),
            name: expect.any(String),
            createdAt: expect.any(String),
            updatedAt: expect.any(String)
        });
    });
});

/**
 * DELETE CATEGORY TESTS
 * @description Test the DELETE /categories/:id route
 */
describe('DELETE /categories/:id API Endpoint', () => {

    // 🟢 Test 1: Delete a category successfully
    it('should return 200 for successful category deletion', async () => {
        const response = await request(app).delete(`/categories/${categoryCreatedId}`);
        const responseBody = response.body as IHttpResponse<null>;

        expect(response.status).toBe(200);
        expect(responseBody).toHaveProperty('status', 200);
        expect(responseBody).toHaveProperty('message', 'Category deleted successfully');
        expect(responseBody.data).toBeNull();
    });

    // ❌ Test 2: Delete a non-existing category
    it('should return 404 for non-existing category ID', async () => {
        const response = await request(app).delete('/categories/9999');
        const responseBody = response.body as IHttpResponse<null>;

        expect(response.status).toBe(404);
        expect(responseBody).toHaveProperty('status', 404);
        expect(responseBody).toHaveProperty('message', 'Category not found');
        expect(responseBody.data).toBeNull();
    });

    // ❌ Test 3: Delete a category with invalid ID
    it('should return 400 for invalid category ID', async () => {
        const response = await request(app).delete('/categories/invalid-id');
        const responseBody = response.body as IHttpResponse<IBadRequestError[]>;

        expect(response.status).toBe(400);
        expect(responseBody).toHaveProperty('status', 400);
        expect(responseBody).toHaveProperty('message', 'Invalid category ID');
    });

    // ❌ Test 4: Delete a category with associated movies
    it('should return 409 if category has associated movies', async () => {
        const response = await request(app).delete('/categories/1');  // Assuming category ID 2 has associated movies
        const responseBody = response.body as IHttpResponse<Movie[]>;

        expect(response.status).toBe(409);
        expect(responseBody).toHaveProperty('status', 409);
        expect(responseBody).toHaveProperty('message', 'Cannot delete category with associated movies');
        expect(responseBody.data).toBeInstanceOf(Array);

        if (responseBody.data.length > 0) {
            const movie = responseBody.data[0];
            expect(movie).toMatchObject({
                id: expect.any(Number),
                title: expect.any(String),
                description: expect.any(String),
                categoryId: expect.any(Number),
                createdAt: expect.any(String),
                updatedAt: expect.any(String),
                deletedAt: null
            });
        }
    });
});