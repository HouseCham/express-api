import { Movie } from "@/domain/entities/Movie";
import { HttpCodes } from "@/domain/enums/httpCodes";
import IHttpResponse from "@/domain/interfaces/IHttpResponse";
import { MovieRepository } from "@/domain/repositories/movie.repo";
import { MovieDTO } from "@/application/dto/MovieDTO";
import ISearchParams from "@/domain/interfaces/ISearchParams";
import { CategoryRepository } from "@/domain/repositories/category.repo";
/**
 * @class MovieService
 * @description Service for Movie entity
 */
export class MovieService {
  private _movieRepository: MovieRepository;
  private _categoryRepository: CategoryRepository;

  constructor() {
    this._movieRepository = new MovieRepository();
    this._categoryRepository = new CategoryRepository();
  }
  /**
   * Service to create a movie
   * @param {Movie} data - Movie data
   * @returns {Promise<IHttpResponse<Movie>>}
   */
  public async createMovie(data: Movie): Promise<IHttpResponse<Movie | null>> {
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
    // check if the category exists
    const category = await this._categoryRepository.findById(data.categoryId);
    if (!category) {
      const response: IHttpResponse<null> = {
        status: HttpCodes.BAD_REQUEST,
        message: `There is no category with the given id: ${data.categoryId}`,
        data: null,
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
  public async updateMovie(data: Partial<Movie>): Promise<IHttpResponse<Movie | null>> {
    const movie = await this._movieRepository.findById(data.id ?? 0);
    if (!movie) {
      const response: IHttpResponse<null> = {
        status: HttpCodes.NOT_FOUND,
        message: 'Movie not found',
        data: null,
      };
      return response;
    }
    // check if the movie already exists
    const movieTitleExists = await this._movieRepository.findMovieByTitle(data.title ?? '');
    if (!!movieTitleExists && movieTitleExists.id !== movie.id) {
      const response: IHttpResponse<Movie> = {
        status: HttpCodes.CONFLICT,
        message: 'Movie title already exists',
        data: movieTitleExists,
      };
      return response;
    }
    // check if the category exists
    const category = await this._categoryRepository.findById(data.categoryId ?? 0);
    if (!category) {
      const response: IHttpResponse<null> = {
        status: HttpCodes.BAD_REQUEST,
        message: `There is no category with the given id: ${data.categoryId}`,
        data: null,
      };
      return response;
    }
    // update the movie
    const movieUpdated = await this._movieRepository.update(movie.id, data);
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
  public async listMovies(searchParams: ISearchParams): Promise<IHttpResponse<MovieDTO[]>> {
    const moviesDB = await this._movieRepository.findAllMovies(searchParams);
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
