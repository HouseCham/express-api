import { Movie } from '@/domain/entities/Movie';
import IHttpResponse from '@/domain/interfaces/IHttpResponse';
import { Request, Response } from 'express';

/**
 * Controller to get all movies
 * @param {Request} req - Request object
 * @param {Response} res - Response object
 * @returns {Promise<HttpResponse<Movie[]>>}
 */
export const getAllMovies = async (req: Request, res: Response) => {
  try {
    // get all movies from the database
    const movies = await Movie.findAll();
    const response: IHttpResponse<Movie[]> = {
      status: 200,
      message: 'Movies retrieved successfully',
      data: movies,
    };
    res.status(200).json(response);
  } catch (error) {
    const response: IHttpResponse<unknown> = {
      status: 500,
      message: 'Internal server error',
      data: error,
    };
    res.status(500).json(response);
  };
};

// Create a new movie
export const createMovie = (req: Request, res: Response) => {
  const { title } = req.body;
  res.status(201).json({ message: `Movie '${title}' created successfully!` });
};
