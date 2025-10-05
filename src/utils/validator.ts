import { Request, Response, NextFunction, RequestHandler } from 'express';
import { z } from 'zod';

export function validateBody<T>(schema: z.Schema<T>): RequestHandler {
    return (req: Request, res: Response, next: NextFunction) => {
        const result = schema.safeParse(req.body);
        if (!result.success) {
            const message = result.error.errors
                .map(e => `${e.path.join('.') || 'body'} : ${e.message}`)
                .join('<br>');
            const error = new Error(message);
            error.name = 'ValidationError';
            return next(error);
        }
        next();
    };
}
