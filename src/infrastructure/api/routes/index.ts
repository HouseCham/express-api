import { Router } from 'express';
import { createMovie, getAllMovies, getMovieById, updateMovie, deleteMovie } from '@/infrastructure/api/controllers/movieController';
import { validateSchema } from '@/infrastructure/middleware/validate';
import { movieSchema } from '@/infrastructure/validation/movieSchema';

const router = Router();
router.get('/', getAllMovies);
router.get('/:id', getMovieById);
router.post('/', validateSchema(movieSchema), createMovie);
router.put('/', validateSchema(movieSchema), updateMovie);
router.delete('/:id', deleteMovie);

export default router;
