import { Router } from 'express';
import { createMovie, getAllMovies } from '@/infrastructure/api/controllers/movieController';
import { validateSchema } from '@/infrastructure/middleware/validate';
import { movieSchema } from '@/infrastructure/validation/movieSchema';

const router = Router();
router.get('/', getAllMovies);       // GET /api/movies
router.post('/', validateSchema(movieSchema), createMovie);       // POST /api/movies

export default router;
