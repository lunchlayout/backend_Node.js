import { NextFunction, Response } from "express";
import { IGetDishByIdReq, IGetDishesReq } from "../types/request";
import { DishService } from "../services/index.js";
import { isValidObjectId } from "mongoose";
import { APIError } from "../errors/APIError.js";
import { queryDishesSchema } from "../validation/queryValidator.js";

class DishController {
    static async getDishes(req: IGetDishesReq, res: Response, next: NextFunction) {
        try {
            const {cafeId, q, p} = await queryDishesSchema.validate(req.query);
            const dishes = await DishService.getDishes(cafeId, q, p);
            return res.status(200).json(dishes)  
        } catch (error) {
            next(error)
        }
    }
    static async getDishContent(req: IGetDishByIdReq, res: Response, next: NextFunction) {
        try {
            const {dishId} = req.params;
            if (!isValidObjectId(dishId)) throw APIError.NotFound();
            
            const dish = await DishService.getDishContent(dishId);
            return res.status(200).json(dish)  
        } catch (error) {
            next(error)
        }
    }
    static async getDishAbout(req: IGetDishByIdReq, res: Response, next: NextFunction) {
        try {
            const {dishId} = req.params;
            if (!isValidObjectId(dishId)) throw APIError.NotFound();
            
            const dish = await DishService.getDishAbout(dishId);
            return res.status(200).json(dish)  
        } catch (error) {
            next(error)
        }
    }
}

export {DishController}