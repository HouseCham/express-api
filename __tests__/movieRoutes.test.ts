import request from 'supertest';
import express from 'express';
import apiRoutes from '../src/infrastructure/api/routes';

const app = express();
app.use(express.json());
app.use(apiRoutes);

describe('GET /api/v1/movies/1', () => {
  it('should return a list of movies', async () => {
    const response = await request(app).get('/api/v1/movies');
    expect(response.status).toBe(200);
    expect(response.body).toEqual([
      { id: 1, title: 'Inception' },
      { id: 2, title: 'The Matrix' }
    ]);
  });
});
