import { Movie } from "@/domain/entities/Movie";
import { IBaseModel } from "@/domain/interfaces/IBaseModel";
import { Category } from "../entities/Category";
import { MovieDTO } from "@/application/dto/MovieDTO";

/**
 * @class MovieRepository
 * @extends {IBaseModel<Movie>}
 * @description Repository for Movie entity
 */
export class MovieRepository implements IBaseModel<Movie> {
  /**
   * Repository function for creating a movie
   * @param {Movie} data - Movie data
   * @returns {Promise<Movie>}
   */
  async create(data: Movie): Promise<Movie> {
    return Movie.create({ ...data });
  }
  /**
   * Repository function for updating a movie
   * @param {number} id - Movie id
   * @param {Partial<Movie>} data - Movie data
   * @returns {Promise<Movie | null>}
   */
  async update(id: number, data: Partial<Movie>): Promise<Movie | null> {
    const movie = await Movie.findByPk(id);
    if (movie) {
      await movie.update(data);
    }
    return movie;
  }
  /**
   * Repository function for deleting a movie
   * @description This method updates the deletedAt field of the movie to the current date
   * @param {number} id - Movie id
   * @returns {Promise<boolean>}
   */
  async delete(id: number): Promise<boolean> {
    const movie = await Movie.findByPk(id);
    if (movie) {
      await movie.update({ deletedAt: new Date() });
      return true;
    }
    return false;
  }
  /**
   * Repository function to find a movie by id
   * @param {number} id - Movie id
   * @returns {Promise<Movie | null>}
   */
  async findById(id: number): Promise<Movie | null> {
    return Movie.findOne({
      where: { id, deletedAt: null },
      include: [
        {
          model: Category,
          attributes: ['name'],
        },
      ],
    });
  }
  /**
   * Repository function to find all movies
   * @returns {Promise<Movie[]>}
   */
  async findAll(): Promise<Movie[]> {
    return await Movie.findAll({
      where: { deletedAt: null },
      include: [
        {
          model: Category,
          attributes: ['name'],
        },
      ],
    });
  }
}
