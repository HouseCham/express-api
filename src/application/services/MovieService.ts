import { Movie } from "@/domain/entities/Movie";
import { HttpCodes } from "@/domain/enums/httpCodes";
import IHttpResponse from "@/domain/interfaces/IHttpResponse";
import { MovieRepository } from "@/domain/repositories/movie.repo";
import { MovieDTO } from "../dto/MovieDTO";
/**
 * @class MovieService
 * @description Service for Movie entity
 */
export class MovieService {
  private _movieRepository: MovieRepository;

  constructor() {
    this._movieRepository = new MovieRepository();
  }
  /**
   * Service to create a movie
   * @param {Movie} data - Movie data
   * @returns {Promise<IHttpResponse<Movie>>}
   */
  public async createMovie(data: Movie): Promise<IHttpResponse<Movie>> {
    // check if the movie already exists
    const movieExists = await this._movieRepository.findMovieByTitle(data.title);
    if (!!movieExists) {
      const response: IHttpResponse<Movie> = {
        status: HttpCodes.CONFLICT,
        message: 'Movie already exists',
        data: movieExists,
      };
      return response;
    }
    // create the movie
    const movie = await this._movieRepository.create(data);
    const response: IHttpResponse<Movie> = {
      status: HttpCodes.CREATED,
      message: 'Movie created successfully',
      data: movie,
    };
    return response;
  }
  /**
   * Service to update a movie
   * @param {number} id - Movie id
   * @param {Partial<Movie>} data - Movie data
   * @returns {Promise<IHttpResponse<Movie | null>>}
   */
  public async updateMovie(id: number, data: Partial<Movie>): Promise<IHttpResponse<Movie | null>> {
    const movie = await this._movieRepository.findById(id);
    if (!movie) {
      const response: IHttpResponse<null> = {
        status: HttpCodes.NOT_FOUND,
        message: 'Movie not found',
        data: null,
      };
      return response;
    }
    // update the movie
    const movieUpdated = await this._movieRepository.update(id, data);
    const response: IHttpResponse<Movie> = {
      status: movieUpdated ? HttpCodes.OK : HttpCodes.INTERNAL_SERVER_ERROR,
      message: movieUpdated ? 'Movie updated successfully' : 'Error updating movie',
      data: movie,
    };
    return response;
  }
  /**
   * Service to delete a movie
   * @param {number} id - Movie id
   * @returns {Promise<IHttpResponse<null>>}
   * @description This method updates the deletedAt field of the movie
   */
  public async deleteMovie(id: number): Promise<IHttpResponse<null>> {
    // find the movie by id
    const movie = await this._movieRepository.findById(id);
    if (!movie) {
      const response: IHttpResponse<null> = {
        status: HttpCodes.NOT_FOUND,
        message: 'Movie not found',
        data: null,
      };
      return response;
    }
    // update deletedAt field
    const deleted = await this._movieRepository.delete(id);
    if (!deleted) {
      const response: IHttpResponse<null> = {
        status: HttpCodes.INTERNAL_SERVER_ERROR,
        message: 'Error deleting movie',
        data: null,
      };
      return response;
    }
    const response: IHttpResponse<null> = {
      status: HttpCodes.OK,
      message: 'Movie deleted successfully',
      data: null,
    };
    return response;
  }
  /**
   * Service to get a movie by id
   * @param {number} id - Movie id
   * @returns {Promise<IHttpResponse<Movie | null>>}
   */
  public async getMovieById(id: number): Promise<IHttpResponse<MovieDTO | null>> {
    const movie = await this._movieRepository.findById(id);
    if (!movie) {
      const response: IHttpResponse<null> = {
        status: HttpCodes.NOT_FOUND,
        message: 'Movie not found',
        data: null,
      };
      return response;
    }
    const movieDTO: MovieDTO = {
      id: movie.id,
      title: movie.title,
      description: movie.description,
      category: {
        id: movie.categoryId,
        name: movie.Category?.name || 'Unknown',
      }
    };
    const response: IHttpResponse<MovieDTO> = {
      status: HttpCodes.OK,
      message: 'Movie retrieved successfully',
      data: movieDTO,
    };
    return response;
  }
  /**
   * Service to list all movies
   * @returns {Promise<IHttpResponse<Movie[]>>}
   * @description This method retrieves all movies from the database
   */
  public async listMovies(): Promise<IHttpResponse<MovieDTO[]>> {
    const moviesDB = await this._movieRepository.findAll();
    const moviesDTO: MovieDTO[] = moviesDB.map((movie) => ({
      id: movie.id,
      title: movie.title,
      description: movie.description,
      category: {
        id: movie.categoryId,
        name: movie.Category?.name || 'Unknown',
      }
    }));
    const response: IHttpResponse<MovieDTO[]> = {
      status: HttpCodes.OK,
      message: moviesDTO.length > 0 ? 'Movies retrieved successfully' : 'No movies found',
      data: moviesDTO,
    };
    return response;
  }
}
