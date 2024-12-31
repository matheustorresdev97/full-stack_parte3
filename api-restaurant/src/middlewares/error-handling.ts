import { AppError } from "@/utils/AppError"
import { Request, Response, NextFunction, ErrorRequestHandler } from "express"
import { ZodError } from "zod"

export const errorHandling: ErrorRequestHandler = (error, request, response, next) => {
    if (error instanceof AppError) {
        response.status(error.statusCode).json({ message: error.message })
    }

    if (error instanceof ZodError) {
        response.status(400).json({ message: "Validation error!", issues: error.format() })
    }

    response.status(500).json({
        message: error.message
    })
}