import { Types } from "mongoose";
import { CafeModel, ICafe } from "../schemas/cafe.js"
import { DishModel, IDish } from "../schemas/dish.js";
import { APIError } from "../errors/APIError.js";

type IDishForList = Omit<IDish, 'description' | 'cafeId' | 'allergens' | 'ingredients' | 'kbzhu'> 

class CafeDAL {
    static async getCafeById(cafeId: string) {
        const cafe = await CafeModel.findById(cafeId).select('-_id').lean() as ICafe;
        if (!cafe) throw APIError.NotFound();
        return cafe
    }
}

export {CafeDAL}