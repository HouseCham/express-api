import { Request, Response } from 'express';
import { Movie } from '@/domain/entities/Movie';
import { HttpCodes } from '@/domain/enums/httpCodes';
import IHttpResponse from '@/domain/interfaces/IHttpResponse';
import { createErrorResponse } from '@/infrastructure/utils/errors.utils';
/**
 * Controller to get all movies
 * @param {Request} req - Request object
 * @param {Response} res - Response object
 * @returns {Promise<HttpResponse<Movie[]>>}
 */
export const getAllMovies = async (req: Request, res: Response) => {
  console.log('Controller: getAllMovies called');
  try {
    // get all movies from the database
    const movies = await Movie.findAll();
    const response: IHttpResponse<Movie[]> = {
      status: HttpCodes.OK,
      message: movies.length > 0 ? 'Movies retrieved successfully' : 'No movies found',
      data: movies,
    };
    res.status(response.status).json(response);
  } catch (error) {
    console.error('Error getting all movies:', error);
    res.status(HttpCodes.INTERNAL_SERVER_ERROR).json(createErrorResponse());
  };
};
/**
 * Controller to get a movie by id
 * @param {Request} req - Request object
 * @param {Response} res - Response object
 * @returns {Promise<HttpResponse<Movie>>}
 */
export const getMovieById = async (req: Request, res: Response) => {
  console.log('Controller: getMovieById called');
  try {
    // get the movie id from the request
    const { id } = req.params;
    // find the movie by id
    const movie = await Movie.findByPk(id);
    if (!movie) {
      const response: IHttpResponse<null> = {
        status: HttpCodes.NOT_FOUND,
        message: 'Movie not found',
        data: null,
      };
      res.status(response.status).json(response);
      return;
    }
    const response: IHttpResponse<Movie> = {
      status: HttpCodes.OK,
      message: 'Movie retrieved successfully',
      data: movie,
    };
    res.status(response.status).json(response);
  } catch (error) {
    console.error('Error getting a movie:', error);
    res.status(HttpCodes.INTERNAL_SERVER_ERROR).json(createErrorResponse());
  }
};
/**
 * Controller to create a movie
 * @param {Request} req - Request object
 * @param {Response} res - Response object
 * @returns {Promise<HttpResponse<Movie>>}
 */
export const createMovie = (req: Request, res: Response) => {
  console.log('Controller: createMovie called');
  try {
    // create a new movie
    const movie = Movie.build(req.body);
    movie.save();
    const response: IHttpResponse<Movie> = {
      status: HttpCodes.CREATED,
      message: 'Movie created successfully',
      data: movie,
    };
    res.status(response.status).json(response);
  } catch (error) {
    console.error('Error creating a movie:', error);
    res.status(HttpCodes.INTERNAL_SERVER_ERROR).json(createErrorResponse());
  };
};
/**
 * Controller to update a movie
 * @param {Request} req - Request object
 * @param {Response} res - Response object
 * @returns {Promise<HttpResponse<Movie>>}
 */
export const updateMovie = async (req: Request, res: Response) => {
  console.log('Controller: updateMovie called');
  try {
    // get the movie id from the request
    const { id } = req.params;
    // find the movie by id
    const movie = await Movie.findByPk(id);
    if (!movie) {
      const response: IHttpResponse<null> = {
        status: HttpCodes.NOT_FOUND,
        message: 'Movie not found',
        data: null,
      };
      res.status(response.status).json(response);
      return;
    }
    // update the movie
    movie.update(req.body);
    const response: IHttpResponse<Movie> = {
      status: HttpCodes.OK,
      message: 'Movie updated successfully',
      data: movie,
    };
    res.status(response.status).json(response);
  } catch (error) {
    console.error('Error updating a movie:', error);
    res.status(HttpCodes.INTERNAL_SERVER_ERROR).json(createErrorResponse());
  };
}
/**
 * Controller to delete a movie
 * @param {Request} req - Request object
 * @param {Response} res - Response object
 * @returns {Promise<HttpResponse<null>>}
 */
export const deleteMovie = async (req: Request, res: Response) => {
  console.log('Controller: deleteMovie called');
  try {
    // get the movie id from the request
    const { id } = req.params;
    // find the movie by id
    const movie = await Movie.findByPk(id);
    if (!movie) {
      const response: IHttpResponse<null> = {
        status: HttpCodes.NOT_FOUND,
        message: 'Movie not found',
        data: null,
      };
      res.status(response.status).json(response);
      return;
    }
    // update deletedAt field
    movie.update({ deletedAt: new Date() });
    const response: IHttpResponse<Movie> = {
      status: HttpCodes.OK,
      message: 'Movie deleted successfully',
      data: movie,
    };
    res.status(response.status).json(response);
  } catch (error) {
    console.error('Error deleting a movie:', error);
    res.status(HttpCodes.INTERNAL_SERVER_ERROR).json(createErrorResponse());
  };
}