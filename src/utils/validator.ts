import { Request, Response, NextFunction, RequestHandler } from 'express';
import { z } from 'zod';

/**
 * Fabrique de middleware générique pour valider le corps d'une requête
 */
export function validateBody<T>(schema: z.Schema<T>): RequestHandler {
    return (req: Request, res: Response, next: NextFunction) => {
        const result = schema.safeParse(req.body);
        if (!result.success) {
            const message = result.error.errors.map(e => e.message).join(', ');
            return res.status(400).send({ error: message });
        }
        next();
    };
}
