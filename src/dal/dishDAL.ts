import { Types } from "mongoose";
import { DishModel, IDish } from "../schemas/dish.js";
import { DishContentModel, IDishContent } from "../schemas/dishContent.js"
import { CafeModel, ICafe } from "../schemas/cafe.js";
import { APIError } from "../errors/APIError.js";
import { PaginationHelper } from "../lib/pagination.js";

class DishDAL {
    static async getDishes(cafeId: string, query: string, page: number) {
        const queryRegexp = new RegExp(`.*${query.replace(/'/g, '')}.*`, 'i');
        const itemCount = await DishModel.countDocuments({cafeId, name: {$regex: queryRegexp}});
        if (!itemCount) return {
            dishes: [],
            cafeName: ''
        }
        const itemsPerPage = 6;
        const paginationHelper = new PaginationHelper(itemCount, itemsPerPage);
        const itemsOnPage = paginationHelper.pageItemCount(page);
        if (itemsOnPage === -1) throw APIError.BadRequest();


        
        const dishes = await DishModel.find({cafeId, name: {$regex: queryRegexp}}).
        skip(page * itemsPerPage).limit(itemsOnPage).
        select('_id name amount unit img').lean() as (Pick<IDish, 'name' | 'amount' | 'unit' | 'img'> & {_id: Types.ObjectId})[];
        if (!dishes.length) throw APIError.NotFound();

        const dishesWithId = dishes.map(dish => ({
            ...dish,
            dishId: dish._id,
            _id: undefined
        }))

        const cafe = await CafeModel.findOne({_id: cafeId}).select('name').lean() as Pick<ICafe, 'name'>;

        const dishesWithCafe = {
            dishes: dishesWithId,
            cafeName: cafe.name
        }

        return dishesWithCafe  
    }
    static async getDishContent(dishId: string) {
        const dish = await DishModel.findById(dishId).select('name cafeId -_id').lean() as Pick<IDish, 'name' | 'cafeId'>;
        if (!dish) throw APIError.NotFound();

        const dishContent = await DishContentModel.findOne({dishId}).select('-dishId, -_id').lean() as Omit<IDishContent, 'dishId'>;
        const cafe = await CafeModel.findOne({_id: dish.cafeId}).select('name').lean() as Pick<ICafe, 'name'>;

        const dishWithContent = {
            dishId,
            ...dish,
            ...dishContent,
            cafeName: cafe.name
        }
        
        return dishWithContent  
    }
    static async getDishAbout(dishId: string) {
        const dish = await DishModel.findById(dishId).select('-_id').lean() as IDish;
        if (!dish) throw APIError.NotFound();
        const cafe = await CafeModel.findOne({_id: dish.cafeId}).select('name').lean() as Pick<ICafe, 'name'>;
        
        const dishWithCafe = {
            dishId,
            ...dish,
            cafeName: cafe.name
        }
        return dishWithCafe  
    }
}

export {DishDAL}