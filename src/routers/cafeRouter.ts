import { Router } from "express";
import { CafeController } from "../controllers/index.js";

const cafeRouter = Router();

cafeRouter.route("/:cafeId").get(CafeController.getCafeById);

export { cafeRouter };
