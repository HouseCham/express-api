import { Movie } from "@/domain/entities/Movie";
import IBaseModel from "@/domain/interfaces/IBaseModel";
import { Category } from "@/domain/entities/Category";
import { Op, WhereOptions } from "sequelize";
import ISearchParams from "@/domain/interfaces/ISearchParams";


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
    const movie = await Movie.findOne({
      where: { id, deletedAt: null },
    })
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
    const movie = await Movie.findOne({
      where: { id, deletedAt: null },
    })
    if (movie) {
      await movie.destroy();
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
   * Repository function to find a movie by title
   * @param {string} title - Movie title
   * @returns {Promise<Movie | null>}
   */
  async findAll(): Promise<Movie[]> {
    return Movie.findAll({
      where: { deletedAt: null },
      include: [
        {
          model: Category,
          attributes: ['name'],
        },
      ],
    });
  };
  /**
   * Repository function to find all movies
   * @returns {Promise<Movie[]>}
   */
  async findAllMovies(searchParams: ISearchParams): Promise<Movie[]> {
    const {
      page,
      itemsPerPage,
      searchQuery,
      categoryId,
      sortBy = 'title',
      sortOrder = 'DESC',
    } = searchParams;

    const whereConditions: WhereOptions = { deletedAt: null };
    // Apply search query condition if present
    if (searchQuery) {
      whereConditions.title = {
        [Op.iLike]: `%${searchQuery}%`,
      };
    }
    // Apply category filter if present
    if (categoryId > 0) {
      whereConditions.categoryId = categoryId;
    }
    const movieList = await Movie.findAll({
      where: whereConditions,
      include: [
        {
          model: Category,
          attributes: ['name'],
        },
      ],
      limit: itemsPerPage,
      offset: itemsPerPage * (page - 1),
      order: [[sortBy, sortOrder]],
    });
    return movieList;
  }
  /**
   * Repository function to find a movie by title
   * @param {string} title - Movie title
   * @returns {Promise<Movie | null>}
   */
  async findMovieByTitle(title: string): Promise<Movie | null> {
    return Movie.findOne({
      where: {
        title: {
          [Op.iLike]: `%${title}%`,  // Case-insensitive search
        },
        deletedAt: null,
      },
    });
  }
  /**
   * Repository function to find all movies by category id
   * @param {number} categoryId - Category id
   * @returns {Promise<Movie[]>}
   */
  async findMoviesByCategoryId(categoryId: number): Promise<Movie[]> {
    return Movie.findAll({
      where: {
        categoryId,
        deletedAt: null,
      },
    });
  }
}
