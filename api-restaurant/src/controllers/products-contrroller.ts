import { knex } from "@/database/knex";
import { AppError } from "@/utils/AppError";
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
                name: z.string().trim().min(6),
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

    async update(req: Request, res: Response, next: NextFunction) {
        try {
            const id = z.string()
                .transform((value) => Number(value))
                .refine((value) => !isNaN(value), { message: "o id deve ser um número." })
                .parse(req.params.id)

            const bodySchema = z.object({
                name: z.string().trim().min(6),
                price: z.number().gt(0),
            })

            const { name, price } = bodySchema.parse(req.body)

            const product = await knex<ProductRepository>("products")
                .select()
                .where({ id })
                .first()

            if (!product) {
                throw new AppError("produto não encontrado")
            }

            await knex<ProductRepository>("products")
                .update({ name, price, updated_at: knex.fn.now() })
                .where({ id })

            res.json()
        } catch (error) {
            next(error)
        }
    }

    async remove(req: Request, res: Response, next: NextFunction) {
        try {
            const id = z.string()
                .transform((value) => Number(value))
                .refine((value) => !isNaN(value), { message: "o id deve ser um número." })
                .parse(req.params.id)

            const product = await knex<ProductRepository>("products")
                .select()
                .where({ id })
                .first()

            if (!product) {
                throw new AppError("produto não encontrado")
            }

            await knex<ProductRepository>("products")
                .delete()
                .where({ id })

            res.json()
        } catch (error) {
            next(error)
        }
    }
}

