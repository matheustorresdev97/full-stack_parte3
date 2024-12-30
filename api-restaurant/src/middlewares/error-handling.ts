import { AppError } from "@/utils/AppError"
import { Request, Response, NextFunction, ErrorRequestHandler } from "express"

export const errorHandling: ErrorRequestHandler = (error, request, response, next) => {
    if (error instanceof AppError) {
        response.status(error.statusCode).json({ message: error.message })
    }

    response.status(500).json({
        message: error.message
    })
}