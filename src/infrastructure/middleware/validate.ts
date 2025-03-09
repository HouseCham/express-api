import { Schema, ZodSchema } from 'zod';
import { Request, Response, NextFunction } from 'express';
import { HttpCodes } from '@/domain/enums/httpCodes';
/**
 * Middleware to validate request body against a schema
 * @param schema - Zod schema to validate request body
 * @returns Express middleware function
 */
export const validateSchema =
    (schema: ZodSchema<any>) =>
        (req: Request, res: Response, next: NextFunction): void => {
            const result = schema.safeParse(req.body);
            if (!result.success) {
                const errors = result.error.errors.map((err) => ({
                    path: err.path.join('.'),
                    message: err.message
                }));
                res.status(HttpCodes.BAD_REQUEST).json({ errors });
                return;
            }
            next();
        };
