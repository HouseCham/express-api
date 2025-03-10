import { ZodSchema } from 'zod';
import { Request, Response, NextFunction } from 'express';
import { HttpCodes } from '@/domain/enums/httpCodes';
import IHttpResponse from '@/domain/interfaces/IHttpResponse';
import IBadRequestError from '@/domain/interfaces/IBadRequestError';
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
                const response: IHttpResponse<IBadRequestError[]> = {
                    status: HttpCodes.BAD_REQUEST,
                    message: 'Validation error',
                    data: errors,
                };
                res.status(response.status).json(response);
                return;
            }
            next();
        };
