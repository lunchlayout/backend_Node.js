import { Router } from "express";
import { DishController } from '../controllers/index.js'

const dishRouter = Router();

dishRouter.route('/:dishId')
            .get(DishController.getDishById);



export {dishRouter}