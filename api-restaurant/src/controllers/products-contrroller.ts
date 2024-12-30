import { Request, Response, NextFunction } from "express"

export class ProductsControlLer {
    async index(req: Request, res: Response, next: NextFunction) {
        try {
            res.json({ message: "OK" })
        } catch (error) {
            next(error);
        }
    }
}

