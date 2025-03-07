
import { Movie } from '@/src//domain/entities/Movie';
import { MovieRepository } from '@/src//domain/repositories/movie.repo';
/**
 * @class MovieService
 * @description Service for Movie entity
 */
export class MovieService {
  private movieRepository = new MovieRepository();

  async createMovie(data: Movie) {
    return this.movieRepository.create(data);
  }

  async updateMovie(id: number, data: Partial<Movie>) {
    return this.movieRepository.update(id, data);
  }

  async deleteMovie(id: number) {
    return this.movieRepository.delete(id);
  }

  async getMovieById(id: number) {
    return this.movieRepository.findById(id);
  }

  async listMovies() {
    return this.movieRepository.findAll();
  }
}
