import { Movie } from "@/domain/entities/Movie";
import { IBaseModel } from "@/domain/interfaces/IBaseModel";

/**
 * @class MovieRepository
 * @extends {IBaseModel<Movie>}
 * @description Repository for Movie entity
 */
export class MovieRepository implements IBaseModel<Movie> {
  async create(data: Movie): Promise<Movie> {
    return Movie.create({...data});
  }

  async update(id: number, data: Partial<Movie>): Promise<Movie | null> {
    const movie = await Movie.findByPk(id);
    if (movie) {
      await movie.update(data);
    }
    return movie;
  }

  async delete(id: number): Promise<boolean> {
    const deleted = await Movie.destroy({ where: { id } });
    return deleted > 0;
  }

  async findById(id: number): Promise<Movie | null> {
    return Movie.findByPk(id);
  }

  async findAll(): Promise<Movie[]> {
    return Movie.findAll();
  }
}
