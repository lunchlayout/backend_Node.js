import { DishDAL } from "../dal/index.js"
import { doPathToImage, doPathToModel } from "../lib/format.js";

class DishService {
    static async getDishes(cafeId: string, query: string, page: number) {
        const dishesDTO = await DishDAL.getDishes(cafeId, query, page - 1);
        dishesDTO.cafe.logo = doPathToImage(dishesDTO.cafe.logo)
        for (const dish of dishesDTO.dishes) {
            dish.img =  doPathToImage(dish.img)
        }
        return dishesDTO
    }
    static async getDishById(dishId: string) {
        const dish = await DishDAL.getDishById(dishId);
        dish.img = doPathToImage(dish.img)
        const {content} = dish;
        content.modelLink = doPathToModel(content.modelLink);
        for (const story of content.stories) {
            story.img = doPathToImage(story.img)
        }
        return dish
    }
}

export {DishService}