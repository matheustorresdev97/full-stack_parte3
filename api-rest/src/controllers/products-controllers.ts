import { Request, Response } from "express";
import { z } from "zod";

export class ProductsController {
  index(request: Request, response: Response) {
    const { page, limit } = request.query;

    response.send(`Página ${page} de ${limit}`);
  }

  create(request: Request, response: Response) {
    const bodySchema = z.object({
      name: z
        .string({ required_error: "Name is required!" })
        .trim()
        .min(6, { message: "Name Must be 6 or more characters" }),
      price: z.number({ required_error: "Price is required!" }).positive({ message: "Price must be positive" }).gte(10),
    });

    const { name, price } = bodySchema.parse(request.body);

    response.status(201).json({ name, price, user_id: request.user_id });
  }
}
