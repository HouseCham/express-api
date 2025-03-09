import { Router } from 'express';
import { createMovie, getAllMovies } from '@/infrastructure/api/controllers/movieController';

const router = Router();
router.get('/', getAllMovies);       // GET /api/movies
router.post('/', createMovie);       // POST /api/movies

export default router;
