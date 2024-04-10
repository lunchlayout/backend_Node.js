import { Request, Response } from "express";
import { IGetDishByIdReq } from "../types/request";
import { DishService } from "../services/index.js";

class DishController {
    static async getDishById(req: IGetDishByIdReq, res: Response) {
        try {
            const {dishId} = req.params;
            const dish = await DishService.getDishById(dishId);
            return res.status(200).json(dish)  
        } catch (error) {
            
        }
    }
}

export {DishController}