import { Router } from 'express';
import { validateSchema } from '@/infrastructure/middleware/validate';
import { movieSchema } from '@/infrastructure/validation/movieSchema';
import MovieController from '@/infrastructure/api/controllers/movieController';
import CategoryController from '../controllers/categoryController';

const router = Router();
// -- Movie routes
const { getAllMovies, getMovieById, createMovie, updateMovie, deleteMovie } = new MovieController();
router.get('/movies', getAllMovies);
router.get('/movies/:id', getMovieById);
router.post('/movies', validateSchema(movieSchema), createMovie);
router.put('/movies', validateSchema(movieSchema), updateMovie);
router.delete('/movies/:id', deleteMovie);

// -- Category routes
const { getAllCategories, getCategoryById, createCategory, updateCategory, deleteCategory } = new CategoryController();
router.get('/categories', getAllCategories);
router.get('/categories/:id', getCategoryById);
router.post('/categories', createCategory);
router.put('/categories', updateCategory);
router.delete('/categories/:id', deleteCategory);

export default router;
