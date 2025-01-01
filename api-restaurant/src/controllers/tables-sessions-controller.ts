import { knex } from "@/database/knex"
import { AppError } from "@/utils/AppError"
import { Request, Response, NextFunction } from "express"
import z from "zod"

export class TableSessionsController {
    async create(req: Request, res: Response, next: NextFunction) {
        try {
            const bodySchema = z.object({
                table_id: z.number()
            })

            const { table_id } = bodySchema.parse(req.body)

            const session = await knex<TablesSessionsRepository>("tables_sessions")
                .where({ table_id })
                .orderBy("opened_at", "desc")
                .first()

            if (session && !session.closed_at) {
                throw new AppError("Mesa já está aberta")
            }

            await knex<TablesSessionsRepository>("tables_sessions").insert({
                table_id,
                opened_at: knex.fn.now(),
            })
            res.status(201).json()
        } catch (error) {
            next(error)
        }
    }

    async index(req: Request, res: Response, next: NextFunction) {
        try {
            const sessions = await knex<TablesSessionsRepository>("tables_sessions")
                .select()
                .orderBy("opened_at");

            res.json(sessions)
        } catch (error) {
            next(error)
        }
    }

    async update(req: Request, res: Response, next: NextFunction) {
        try {
            const id = z.string()
                .transform((value) => Number(value))
                .refine((value) => !isNaN(value), { message: "o id deve ser um número." })
                .parse(req.params.id)

                const session = await knex<TablesSessionsRepository>("tables_sessions")
                .where({ id })
                .first()

                if(!session) {
                    throw new AppError("Sessão não encontrada")
                }

                if(session.closed_at) {
                    throw new AppError("Sessão já está fechada")
                }

                await knex<TablesSessionsRepository>("tables_sessions")
                .update({
                    closed_at: knex.fn.now()
                })
                .where({ id })

            res.json()
        } catch (error) {
            next(error)
        }
    }
}