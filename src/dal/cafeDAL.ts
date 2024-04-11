import { Types } from "mongoose";
import { CafeModel, ICafe } from "../schemas/cafe.js"
import { DishModel, IDish } from "../schemas/dish.js";
import { APIError } from "../errors/APIError.js";

type IDishForList = Omit<IDish, 'description' | 'cafeId' | 'allergens' | 'ingredients' | 'kbzhu'> 

class CafeDAL {
    static async getCafeById(cafeId: string) {
        const cafe = await CafeModel.findById(cafeId).lean() as ICafe & {_id: Types.ObjectId};
        if (!cafe) throw APIError.NotFound();
        const dishes = await DishModel.find({cafeId}).select('_id name amount unit img').lean() as (IDishForList & {_id: Types.ObjectId})[];
        
        dishes.map(dish => {
            return {
                ...dish,
                dishId: dish._id,
                _id: undefined
            }
        })
        const cafeWithDishes = {
            ...cafe,
            cafeId: cafe._id,
            _id: undefined,
            dishes
        }

        return cafeWithDishes
    }
}

export {CafeDAL}