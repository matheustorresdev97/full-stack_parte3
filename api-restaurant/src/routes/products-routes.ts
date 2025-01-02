import { Router } from "express";
import { ProductsControlLer } from "@/controllers/products-controller";

const productsRoutes = Router()
const productsController = new ProductsControlLer()

productsRoutes.get("/", productsController.index)
productsRoutes.post("/", productsController.create)
productsRoutes.put("/:id", productsController.update)
productsRoutes.delete("/:id", productsController.remove)


export { productsRoutes }