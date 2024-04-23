import { NextFunction, Response } from "express";
import { IGetDishByIdReq } from "../types/request";
import { DishService } from "../services/index.js";
import { isValidObjectId } from "mongoose";
import { APIError } from "../errors/APIError.js";

class DishController {
    static async getDishById(req: IGetDishByIdReq, res: Response, next: NextFunction) {
        try {
            const {dishId} = req.params;
            if (!isValidObjectId(dishId)) throw APIError.NotFound();
            
            const dish = await DishService.getDishById(dishId);
            return res.status(200).json(dish)  
        } catch (error) {
            next(error)
        }
    }
}

export {DishController}