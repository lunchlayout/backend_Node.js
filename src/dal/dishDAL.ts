
import { DishModel, IDish } from "../schemas/dish.js";
import { IModel, ModelModel } from "../schemas/model.js"

import { APIError } from "../errors/APIError.js";

import { IStory, StoryModel } from "../schemas/story.js";
import { IVideo, VideoModel } from "../schemas/video.js";
import { IQuestion, QuetionModel } from "../schemas/quetion.js";

class DishDAL {
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