import request from 'supertest';
import express from 'express';
import apiRoutes from '../src/infrastructure/api/routes';
import IHttpResponse from "../src/domain/interfaces/IHttpResponse";
import { MovieDTO } from "../src/application/dto/MovieDTO";
import { sequelize } from '../src/infrastructure/db/connection';
import { Movie } from "../src/domain/entities/Movie";
import IBadRequestError from '../src/domain/interfaces/IBadRequestError';

const app = express();
app.use(express.json());
app.use(apiRoutes);

afterAll(async () => {
  await sequelize.close();  // Close DB connection after tests
});

/**
 * GET MOVIE LIST TESTS
 * @description Test suite for GET /movies endpoint
 */
describe('GET /movies API Endpoint', () => {

  // 🟢 Test 1: Get all movies
  it('should return a list of movies', async () => {
    const response = await request(app).get('/movies');
    const responseBody = response.body as IHttpResponse<MovieDTO[]>;

    expect(response.status).toBe(200);
    expect(responseBody).toHaveProperty('status', 200);
    expect(responseBody).toHaveProperty('message');
    expect(responseBody).toHaveProperty('data');
    expect(Array.isArray(responseBody.data)).toBe(true);

    // Validate structure of a movie object if data exists
    if (responseBody.data.length > 0) {
      const movie = responseBody.data[0];
      expect(movie).toMatchObject({
        id: expect.any(Number),
        title: expect.any(String),
        description: expect.any(String),
        category: {
          id: expect.any(Number),
          name: expect.any(String)
        }
      });
    }
  });

  // 🟢 Test 2: Get movies by search query
  it('should return a list of movies matching search query "talk to me"', async () => {
    const response = await request(app).get('/movies?searchQuery=talk to me');
    const responseBody = response.body as IHttpResponse<MovieDTO[]>;

    expect(response.status).toBe(200);
    expect(responseBody.data.length).toBe(1);
    expect(Array.isArray(responseBody.data)).toBe(true);

    if (responseBody.data.length > 0) {
      const movie = responseBody.data[0];
      expect(movie).toMatchObject({
        id: expect.any(Number),
        title: expect.any(String),
        description: expect.any(String),
        category: {
          id: expect.any(Number),
          name: expect.any(String)
        }
      });
    }
  });

  // 🟢 Test 3: Get movies by category ID
  it('should return a list of movies matching categoryId = 1', async () => {
    const response = await request(app).get('/movies?categoryId=1');
    const responseBody = response.body as IHttpResponse<MovieDTO[]>;

    expect(response.status).toBe(200);
    expect(Array.isArray(responseBody.data)).toBe(true);

    if (responseBody.data.length > 0) {
      const movie = responseBody.data[0];
      expect(movie).toMatchObject({
        id: expect.any(Number),
        title: expect.any(String),
        description: expect.any(String),
        category: {
          id: 1,  // Ensure categoryId is 1
          name: expect.any(String)
        }
      });
    }
  });

  // 🟢 Test 4: Get movies by non-existing search query
  it('should return an empty list for non-existing search query', async () => {
    const response = await request(app).get('/movies?searchQuery=ntohuntoheu');
    const responseBody = response.body as IHttpResponse<MovieDTO[]>;

    expect(response.status).toBe(200);
    expect(responseBody.data.length).toBe(0);  // Should return an empty array
  });

});

/**
 * POST MOVIE TESTS
 * @description Test suite for POST /movies endpoint
 */
describe('POST MOVIE BAD REQUEST /movies', () => {
  // ❌ Test 1: Sending an empty object
  it('should return 400 for empty movie object', async () => {
    const emptyMovie = {};
    const response = await request(app).post('/movies').send(emptyMovie);
    const responseBody = response.body as IHttpResponse<IBadRequestError[]>;

    expect(response.status).toBe(400);
    expect(responseBody).toHaveProperty('status', 400);
    expect(responseBody).toHaveProperty('message', 'Validation error');
    expect(Array.isArray(responseBody.data)).toBe(true);

    // Validate error structure
    if (responseBody.data.length > 0) {
      const error = responseBody.data[0];
      expect(error).toHaveProperty('path');
      expect(error).toHaveProperty('message');
    }
  });

  // ❌ Test 2: Sending only title (missing other fields)
  it('should return 400 for movie with only title', async () => {
    const onlyTitleMovie = { title: 'Nosferatu' };
    const response = await request(app).post('/movies').send(onlyTitleMovie);
    const responseBody = response.body as IHttpResponse<IBadRequestError[]>;

    expect(response.status).toBe(400);
    expect(responseBody).toHaveProperty('status', 400);
    expect(responseBody).toHaveProperty('message', 'Validation error');
    expect(Array.isArray(responseBody.data)).toBe(true);

    // Validate error structure
    if (responseBody.data.length > 0) {
      const error = responseBody.data[0];
      expect(error).toHaveProperty('path');
      expect(error).toHaveProperty('message');
    }
  });

  // ❌ Test 3: Sending only description (missing other fields)
  it('should return 400 for movie with only description', async () => {
    const onlyDescriptionMovie = { description: 'A classic horror movie' };
    const response = await request(app).post('/movies').send(onlyDescriptionMovie);
    const responseBody = response.body as IHttpResponse<IBadRequestError[]>;

    expect(response.status).toBe(400);
    expect(responseBody).toHaveProperty('status', 400);
    expect(responseBody).toHaveProperty('message', 'Validation error');
    expect(Array.isArray(responseBody.data)).toBe(true);

    // Validate error structure
    if (responseBody.data.length > 0) {
      const error = responseBody.data[0];
      expect(error).toHaveProperty('path');
      expect(error).toHaveProperty('message');
    }
  });

  // ❌ Test 4: Sending only categoryId (missing other fields)
  it('should return 400 for movie with only categoryId', async () => {
    const onlyCategoryIdMovie = { categoryId: 1 };
    const response = await request(app).post('/movies').send(onlyCategoryIdMovie);
    const responseBody = response.body as IHttpResponse<IBadRequestError[]>;

    expect(response.status).toBe(400);
    expect(responseBody).toHaveProperty('status', 400);
    expect(responseBody).toHaveProperty('message', 'Validation error');
    expect(Array.isArray(responseBody.data)).toBe(true);

    // Validate error structure
    if (responseBody.data.length > 0) {
      const error = responseBody.data[0];
      expect(error).toHaveProperty('path');
      expect(error).toHaveProperty('message');
    }
  });

  // ❌ Test 5: Sending a movie with non existing categoryId
  it('should return 400 for movie with non-existing categoryId', async () => {
    const nonExistingCategoryMovie = {
      title: 'A random terror movie title',
      description: 'A random terror movie description',
      categoryId: 9999, // Assuming this category does not exist
    };
    const response = await request(app).post('/movies').send(nonExistingCategoryMovie);
    const responseBody = response.body as IHttpResponse<null>;

    expect(response.status).toBe(400);
    expect(responseBody).toHaveProperty('status', 400);
    expect(responseBody).toHaveProperty('message', 'There is no category with the given id: 9999');
  });

  // ❌ Test 6: Sending a movie with an existing title
  it('should return 409 for movie with existing title', async () => {
    const existingMovie = {
      title: 'Talk to Me',
      description: 'A horror movie about a group of friends who discover how to conjure spirits using an embalmed hand.',
      categoryId: 1,
    };
    const response = await request(app).post('/movies').send(existingMovie);
    const responseBody = response.body as IHttpResponse<Movie>;

    expect(response.status).toBe(409);
    expect(responseBody).toHaveProperty('status', 409);
    expect(responseBody).toHaveProperty('message', 'Movie already exists');

    // Validate structure of the existing movie object
    const movie = responseBody.data;
    expect(movie).toMatchObject({
      id: expect.any(Number),
      title: 'Talk to Me',
      description: expect.any(String),
      categoryId: expect.any(Number),
      createdAt: expect.any(String),
      updatedAt: expect.any(String),
    });
  });
});

/**
 * PUT MOVIE TESTS
 * @description Test suite for PUT /movies/:id endpoint
 */
describe('PUT /movies/:id API Endpoint', () => {

  // ❌ Test 1: Sending an empty object
  it('should return 400 for empty movie object', async () => {
    const emptyMovie = {};
    const response = await request(app).put('/movies').send(emptyMovie);
    const responseBody = response.body as IHttpResponse<IBadRequestError[]>;

    expect(response.status).toBe(400);
    expect(responseBody).toHaveProperty('status', 400);
    expect(responseBody).toHaveProperty('message', 'Validation error');
    expect(Array.isArray(responseBody.data)).toBe(true);
  });

  // ❌ Test 2: Sending only title (missing other fields)
  it('should return 400 for movie with only title', async () => {
    const onlyTitleMovie = { title: 'Nosferatu' };
    const response = await request(app).put('/movies').send(onlyTitleMovie);
    const responseBody = response.body as IHttpResponse<IBadRequestError[]>;

    expect(response.status).toBe(400);
    expect(responseBody).toHaveProperty('status', 400);
    expect(responseBody).toHaveProperty('message', 'Validation error');
    expect(Array.isArray(responseBody.data)).toBe(true);
  });

  // ❌ Test 3: Sending only description (missing other fields)
  it('should return 400 for movie with only description', async () => {
    const onlyDescriptionMovie = { description: 'A classic horror movie' };
    const response = await request(app).put('/movies').send(onlyDescriptionMovie);
    const responseBody = response.body as IHttpResponse<IBadRequestError[]>;

    expect(response.status).toBe(400);
    expect(responseBody).toHaveProperty('status', 400);
    expect(responseBody).toHaveProperty('message', 'Validation error');
    expect(Array.isArray(responseBody.data)).toBe(true);
  });

  // ❌ Test 4: Sending only categoryId (missing other fields)
  it('should return 400 for movie with only categoryId', async () => {
    const onlyCategoryIdMovie = { categoryId: 1 };
    const response = await request(app).put('/movies').send(onlyCategoryIdMovie);
    const responseBody = response.body as IHttpResponse<IBadRequestError[]>;

    expect(response.status).toBe(400);
    expect(responseBody).toHaveProperty('status', 400);
    expect(responseBody).toHaveProperty('message', 'Validation error');
    expect(Array.isArray(responseBody.data)).toBe(true);
  });

  // ❌ Test 5: Sending only Id (missing other fields)
  it('should return 400 for movie with only Id', async () => {
    const onlyIdMovie = { id: 1 };
    const response = await request(app).put('/movies').send(onlyIdMovie);
    const responseBody = response.body as IHttpResponse<IBadRequestError[]>;

    expect(response.status).toBe(400);
    expect(responseBody).toHaveProperty('status', 400);
    expect(responseBody).toHaveProperty('message', 'Validation error');
    expect(Array.isArray(responseBody.data)).toBe(true);
  });

  // ❌ Test 6: Sending a movie with non-existing categoryId
  it('should return 400 for movie with non-existing categoryId', async () => {
    const nonExistingCategoryMovie = {
      id: 1,
      title: 'A random terror movie title',
      description: 'A random terror movie description',
      categoryId: 9999, // Assuming this category does not exist
    };
    const response = await request(app).put('/movies').send(nonExistingCategoryMovie);
    const responseBody = response.body as IHttpResponse<null>;

    expect(response.status).toBe(400);
    expect(responseBody).toHaveProperty('status', 400);
    expect(responseBody).toHaveProperty('message', 'There is no category with the given id: 9999');
  });

  // ❌ Test 7: Sending a movie with an existing title
  it('should return 409 for movie with existing title', async () => {
    const existingMovie = {
      id: 2,
      title: 'Talk to Me',
      description: 'A random terror movie description',
      categoryId: 1,
    };
    const response = await request(app).put('/movies').send(existingMovie);
    const responseBody = response.body as IHttpResponse<MovieDTO>;

    expect(response.status).toBe(409);
    expect(responseBody).toHaveProperty('status', 409);
    expect(responseBody).toHaveProperty('message', 'Movie title already exists');
  });

  // ❌ Test 8: Updating a non-existing movie
  it('should return 404 for non-existing movie', async () => {
    const updatedMovie = {
      id: 9999, // Assuming this movie does not exist
      title: 'Updated Nosferatu',
      description: 'Updated description of Nosferatu',
      categoryId: 1,
    };
    const response = await request(app).put('/movies').send(updatedMovie);
    const responseBody = response.body as IHttpResponse<null>;

    expect(response.status).toBe(404);
    expect(responseBody).toHaveProperty('status', 404);
    expect(responseBody).toHaveProperty('message', 'Movie not found');
  });

  // 🟢 Test 9: Successful update of an existing movie
  it('should return 200 and updated movie for valid request', async () => {
    const updatedMovie = {
      id: 4,
      title: 'Updated Nosferatu',
      description: 'Updated description of Nosferatu',
      categoryId: 1,
    };
    const response = await request(app).put('/movies').send(updatedMovie);
    const responseBody = response.body as IHttpResponse<MovieDTO>;

    expect(response.status).toBe(200);
    expect(responseBody).toHaveProperty('status', 200);
    expect(responseBody).toHaveProperty('message', 'Movie updated successfully');
    expect(responseBody).toHaveProperty('data');

    const movie = responseBody.data;
    expect(movie).toMatchObject({
      id: expect.any(Number),
      title: 'Updated Nosferatu',
      description: 'Updated description of Nosferatu',
      categoryId: 1,
      createdAt: expect.any(String),
      updatedAt: expect.any(String),
    });
  });
});

/**
 * DELETE MOVIE TESTS
 * @description Test suite for DELETE /movies/:id endpoint
 */
describe('DELETE /movies/:id API Endpoint', () => {

  // ❌ Test 1: Deleting a non-existing movie
  it('should return 404 for non-existing movie', async () => {
    const response = await request(app).delete('/movies/9999');
    const responseBody = response.body as IHttpResponse<null>;

    expect(response.status).toBe(404);
    expect(responseBody).toHaveProperty('status', 404);
    expect(responseBody).toHaveProperty('message', 'Movie not found');
  });

  // 🟢 Test 2: Deleting an existing movie
  it('should return 200 for deleting an existing movie', async () => {
    const randomMovie = {
      title: 'Random Movie',
      description: 'Random Movie Description',
      categoryId: 1,
    }
    // Create a random movie
    const createResponse = await request(app).post('/movies').send(randomMovie);
    const createdMovie = createResponse.body as IHttpResponse<Movie>;
    expect(createResponse.status).toBe(201);
    expect(createdMovie).toHaveProperty('status', 201);
    expect(createdMovie).toHaveProperty('message', 'Movie created successfully');
    expect(createdMovie).toHaveProperty('data');

    // Delete the created movie
    const response = await request(app).delete(`/movies/${createdMovie.data.id}`);
    const responseBody = response.body as IHttpResponse<null>;

    expect(response.status).toBe(200);
    expect(responseBody).toHaveProperty('status', 200);
    expect(responseBody).toHaveProperty('message', 'Movie deleted successfully');
  });
});