import { Types } from "mongoose";
import { CafeModel, ICafe } from "../schemas/cafe.js"
import { DishModel, IDish } from "../schemas/dish.js";
import { APIError } from "../errors/APIError.js";
import { PaginationHelper } from "../lib/pagination.js";


class CafeDAL {
    static async getCafeById(cafeId: string, page: number, query: string) {
        const cafeInfo = await CafeModel.findById(cafeId).select('-_id').lean() as ICafe;
        if (!cafeInfo) throw APIError.NotFound();

        const queryRegexp = new RegExp(`.*${query.replace(/'/g, '')}.*`, 'i');
        const itemCount = await DishModel.countDocuments({cafeId, name: {$regex: queryRegexp}});
        if (!itemCount) return {
            ...cafeInfo,
            dishes: [],
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

        const cafe = {
            ...cafeInfo,
            dishes: dishesWithId
        }
        return cafe  
    }
}

export {CafeDAL}