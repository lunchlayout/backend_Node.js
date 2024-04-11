import { Types } from "mongoose";
import { DishModel, IDish } from "../schemas/dish.js";
import { DishContentModel, IDishContent } from "../schemas/dishContent.js"
import { CafeModel } from "../schemas/cafe.js";
import { APIError } from "../errors/APIError.js";

class DishDAL {
    static async getDishById(dishId: string) {
        const dish = await DishModel.findById(dishId).select('-img').lean() as Omit<IDish, 'img'> & {_id: Types.ObjectId};
        if (!dish) throw APIError.NotFound();
        
        const dishContent = await DishContentModel.findOne({dishId}).select('-dishId, -_id').lean() as Omit<IDishContent, 'dishId'>;
        const cafe = await CafeModel.findOne({_id: dish.cafeId}).select('name').lean() as {name: string};

        const dishWithContent = {
            ...dish,
            dishId: dish._id,
            _id: undefined,
            content: dishContent,
            cafeName: cafe.name
        }
        
        return dishWithContent
        
    }
}

export {DishDAL}