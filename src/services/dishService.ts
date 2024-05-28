import { DishDAL } from "../dal/index.js";
import { doPathToImage, doPathToModel } from "../lib/format.js";

class DishService {
	static async getDishById(dishId: string) {
		const dish = await DishDAL.getDishById(dishId);
		dish.img = doPathToImage(dish.img);
		dish.cafe.logo = doPathToImage(dish.cafe.logo);
		dish.modelLink = doPathToModel(dish.modelLink);
		return dish;
	}
}

export { DishService };
