 import { Request, Response, NextFunction } from 'express';


export function connectionRequired(req: Request, res: Response, next: NextFunction){
    if (!req.session.user){
        return res.redirect('/user/login')
    }
    next();
}