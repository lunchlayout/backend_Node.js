import { DishDAL } from "../dal/index.js";
import { doPathToImage, doPathToModel } from "../lib/format.js";

class DishService {
	static async getDishById(dishId: string) {
		const dish = await DishDAL.getDishById(dishId);
		dish.img = doPathToImage(dish.img);
		dish.modelLink = doPathToModel(dish.modelLink);
		const { entertainment } = dish;
		for (const story of entertainment.stories) {
			story.img = doPathToImage(story.img);
		}
		return dish;
	}
}

export { DishService };
