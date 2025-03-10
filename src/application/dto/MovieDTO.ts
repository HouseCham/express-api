import CategoryDTO from "@/application/dto/CategoryDTO"

/**
 * Data Transfer Object for Movie
 * @interface MovieDTO
 * @description Movie Data Transfer Object
 * @property {number} id - Movie id
 * @property {string} title - Movie title
 * @property {string} description - Movie description
 * @property {CategoryDTO} category - Movie category
 */
export interface MovieDTO {
    id: number
    title: string
    description?: string
    category: CategoryDTO
  }