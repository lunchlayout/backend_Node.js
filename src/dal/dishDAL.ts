import { Types } from "mongoose";
import { DishModel, IDish } from "../schemas/dish.js";
import { IModel, ModelModel } from "../schemas/model.js"
import { CafeModel, ICafe } from "../schemas/cafe.js";
import { APIError } from "../errors/APIError.js";
import { PaginationHelper } from "../lib/pagination.js";
import { IStory, StoryModel } from "../schemas/story.js";
import { IVideo, VideoModel } from "../schemas/video.js";
import { IQuestion, QuetionModel } from "../schemas/quetion.js";

class DishDAL {
    static async getDishes(cafeId: string, query: string, page: number) {
        const cafe = await CafeModel.findById(cafeId).select('-_id').lean() as ICafe;
        if (!cafe) throw APIError.NotFound();
        const queryRegexp = new RegExp(`.*${query.replace(/'/g, '')}.*`, 'i');
        const itemCount = await DishModel.countDocuments({cafeId, name: {$regex: queryRegexp}});
        if (!itemCount) return {
            cafe,
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

        const dishesDTO = {
            cafe,
            dishes: dishesWithId
        }
        return dishesDTO  
    }
    static async getDishById(dishId: string) {
        const dish = await DishModel.findById(dishId).select('-_id').lean() as IDish;
        if (!dish) throw APIError.NotFound();
        const dishModel = await ModelModel.findOne({dishId}).select('-_id -dishId').lean() as Omit<IModel, 'dishId'>;
        const dishStories = await StoryModel.find({dishId}).select('-_id -dishId').lean() as Omit<IStory, 'dishId'>[];
        const dishVideos = await VideoModel.find({dishId}).select('-_id -dishId').lean() as Omit<IVideo, 'dishId'>[];
        const dishQuetions = await QuetionModel.find({dishId}).select('-_id -dishId').lean() as Omit<IQuestion, 'dishId'>[];
        
        const dishDTO = {
            ...dish,
            content: {
                ...dishModel,
                stories: dishStories,
                videos: dishVideos,
                quetions: dishQuetions
            }
        }

        return dishDTO
        
    }
}

export {DishDAL}