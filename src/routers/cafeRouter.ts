import { Router } from "express";
import { CafeController } from "../controllers/index.js";

const cafeRouter = Router();

cafeRouter.route("/").get(CafeController.getCafes);

cafeRouter.route("/:cafeId").get(CafeController.getCafeById);

export { cafeRouter };
