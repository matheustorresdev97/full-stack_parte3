import { Router } from "express";

import { TablesController } from "@/controllers/tables-controllers";

const tablesRoutes = Router()
const tableController = new TablesController()

tablesRoutes.get("/", tableController.index)

export { tablesRoutes }