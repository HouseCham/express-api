import { z } from 'zod';
/**
 * Movie schema for validation
 */
export const createMovieSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().optional(),
  categoryId: z.number().positive('Invalid category ID')
});
/**
 * Movie schema for validation when updating
 */
export const updateMovieSchema = z.object({
  id: z.number().positive('Invalid movie ID'),
  title: z.string().min(1, 'Title is required').optional(),
  description: z.string().optional(),
  categoryId: z.number().positive('Invalid category ID').optional()
});