import CategoryDTO from "@/application/dto/CategoryDTO"

/**
 * Data Transfer Object for Movie
 */
export interface MovieDTO {
    id: number
    title: string
    description: string
    category: CategoryDTO
  }