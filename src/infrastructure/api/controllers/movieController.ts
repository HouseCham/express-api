import { Request, Response } from 'express';

// Get all movies
export const getAllMovies = (req: Request, res: Response) => {
  res.json([{ id: 1, title: 'Inception' }, { id: 2, title: 'Interstellar' }]);
};

// Create a new movie
export const createMovie = (req: Request, res: Response) => {
  const { title } = req.body;
  res.status(201).json({ message: `Movie '${title}' created successfully!` });
};
