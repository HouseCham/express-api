import { Router } from 'express';
//-- controllers
import MovieController from '@/infrastructure/api/controllers/movieController';
import CategoryController from '@/infrastructure/api/controllers/categoryController';
//-- validation
import { validateSchema } from '@/infrastructure/middleware/validate';
import { createMovieSchema, updateMovieSchema } from '@/infrastructure/validation/movieSchema';
import { createCategorySchema, updateCategorySchema } from '@/infrastructure/validation/categorySchema';

const router = Router();
// -- Movie routes
const { getAllMovies, getMovieById, createMovie, updateMovie, deleteMovie } = new MovieController();
router.get('/movies', getAllMovies);
router.get('/movies/:id', getMovieById);
router.post('/movies', validateSchema(createMovieSchema), createMovie);
router.put('/movies', validateSchema(updateMovieSchema), updateMovie);
router.delete('/movies/:id', deleteMovie);

// -- Category routes
const { getAllCategories, getCategoryById, createCategory, updateCategory, deleteCategory } = new CategoryController();
router.get('/categories', getAllCategories);
router.get('/categories/:id', getCategoryById);
router.post('/categories', validateSchema(createCategorySchema), createCategory);
router.put('/categories', validateSchema(updateCategorySchema), updateCategory);
router.delete('/categories/:id', deleteCategory);

export default router;
