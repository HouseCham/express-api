import { z } from 'zod';
/**
 * Category schema for validation
 */
export const createCategorySchema = z.object({
  name: z.string().min(1, 'Category name is required')
});
/**
 * Category schema for validation when updating
 */
export const updateCategorySchema = z.object({
  id: z.number().positive('Invalid category ID'),
  name: z.string().min(1, 'Category name is required').optional()
});
