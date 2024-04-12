import { Router } from "express";
import { DishController } from '../controllers/index.js'

const dishRouter = Router();

dishRouter.route('/')
            .get(DishController.getDishes);

dishRouter.route('/:dishId/content')
            .get(DishController.getDishContent);

dishRouter.route('/:dishId/about')
            .get(DishController.getDishAbout);


export {dishRouter}