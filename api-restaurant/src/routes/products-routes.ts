import { Router } from "express";
import { ProductsControlLer } from "@/controllers/products-contrroller";

const productsRoutes = Router()
const productsController = new ProductsControlLer()

productsRoutes.get("/", productsController.index)


export { productsRoutes }