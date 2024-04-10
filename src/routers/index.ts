import { Router } from "express";
import { reviewRouter } from "./reviewRouter.js";
import { cafeRouter } from "./cafeRouter.js";
import { dishRouter } from "./dishRouter.js";

const mainRouter = Router();

mainRouter.use('/reviews', reviewRouter);

mainRouter.use('/cafes', cafeRouter);

mainRouter.use('/dishes', dishRouter);

export {mainRouter}