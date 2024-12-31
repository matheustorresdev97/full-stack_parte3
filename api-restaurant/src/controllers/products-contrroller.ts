import { knex } from "@/database/knex";
import { Request, Response, NextFunction } from "express"
import z from "zod";

export class ProductsControlLer {
    async index(req: Request, res: Response, next: NextFunction) {
        try {
            const { name } = req.query

            const products = await knex<ProductRepository>("products")
                .select()
                .whereLike("name", `%${name || ""}%`)
                .orderBy("name")

            res.status(200).json(products)
        } catch (error) {
            next(error);
        }
    }

    async create(req: Request, res: Response, next: NextFunction) {
        try {
            const bodySchema = z.object({
                name: z.string().min(6),
                price: z.number().gt(0, { message: "valor tem que ser maior que 0" }),
            })
            const { name, price } = bodySchema.parse(req.body);

            await knex<ProductRepository>("products").insert({
                name,
                price
            })

            res.status(201).json()
        } catch (error) {
            next(error);
        }
    }
}

