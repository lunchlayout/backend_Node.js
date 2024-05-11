import { Router } from "express";
import { reviewRouter } from "./reviewRouter.js";
import { cafeRouter } from "./cafeRouter.js";
import { dishRouter } from "./dishRouter.js";
import { errorRouter } from "./errorRouter.js";

const mainRouter = Router();

mainRouter.use("/reviews", reviewRouter);

mainRouter.use("/cafes", cafeRouter);

mainRouter.use("/dishes", dishRouter);

mainRouter.use("/*", errorRouter);

export { mainRouter };
