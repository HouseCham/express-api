import { Request, Response } from 'express';
import { Movie } from '@/domain/entities/Movie';
import { HttpCodes } from '@/domain/enums/httpCodes';
import { createErrorResponse } from '@/infrastructure/utils/errors.utils';
import { MovieService } from '@/application/services/MovieService';
/**
 * @class MovieController
 * @description Controller for Movie entity
 * @exports MovieController
 */
export default class MovieController {
  private _movieService: MovieService;

  constructor() {
    this._movieService = new MovieService();
  }
  /**
   * Controller to get all movies
   * @param {Request} req - Request object
   * @param {Response} res - Response object
   * @returns {Promise<HttpResponse<Movie[]>>}
   */
  public getAllMovies = async (req: Request, res: Response) => {
    console.log('Controller: getAllMovies called');
    try {
      // get all movies from the database
      const response = await this._movieService.listMovies();
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
  public getMovieById = async (req: Request, res: Response) => {
    console.log('Controller: getMovieById called');
    try {
      // get the movie id from the request
      const { id } = req.params;
      // find the movie by id
      const response = await this._movieService.getMovieById(Number(id));
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
  public createMovie = async (req: Request, res: Response) => {
    console.log('Controller: createMovie called');
    try {
      // create a new movie
      const movie = Movie.build(req.body);
      const response = await this._movieService.createMovie(movie);
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
  public updateMovie = async (req: Request, res: Response) => {
    console.log('Controller: updateMovie called');
    try {
      // get the movie id from the request
      const { id } = req.params;
      // find the movie by id
      const response = await this._movieService.updateMovie(Number(id), req.body);
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
  public deleteMovie = async (req: Request, res: Response) => {
    console.log('Controller: deleteMovie called');
    try {
      // get the movie id from the request
      const { id } = req.params;
      const response = await this._movieService.deleteMovie(Number(id));
      res.status(response.status).json(response);
    } catch (error) {
      console.error('Error deleting a movie:', error);
      res.status(HttpCodes.INTERNAL_SERVER_ERROR).json(createErrorResponse());
    };
  }
};