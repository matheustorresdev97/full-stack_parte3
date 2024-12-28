import { ProductsController } from "@/controllers/products-controllers";
import { myMiddleware } from "@/middlewares/my-middlewares";
import { Router } from "express";

const productsRoutes = Router();
const productsControllers = new ProductsController()

productsRoutes.get("/", productsControllers.index);
productsRoutes.post("/", myMiddleware, productsControllers.create);

export { productsRoutes };
