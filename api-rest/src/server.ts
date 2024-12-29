import express, { Request, Response, NextFunction, ErrorRequestHandler } from "express";
import { routes } from "./routes";
import { AppError } from "./utils/AppError";
import { ZodError } from "zod";

const PORT = 3333;

const app = express();
app.use(express.json());

app.use(routes);

const errorHandler: ErrorRequestHandler = (
  error: Error | AppError,
  request: Request,
  response: Response,
  next: NextFunction
): void => {
    if(error instanceof AppError) {
        response.status(error.statusCode).json({message: error.message});
        return;
    }

    if(error instanceof ZodError) {
        response.status(400).json({ message: "Validation error!", issues: error.format() });
        return;
    }

    response.status(500).json({message: error.message});
};

app.use(errorHandler);

app.listen(PORT, () => console.log(`Server listening on ${PORT}`));