import { CafeDAL } from "../dal/index.js";
import { doPathToImage } from "../lib/format.js";

class CafeService {
	static async getCafeById(cafeId: string, page: number, query: string) {
		const cafe = await CafeDAL.getCafeById(cafeId, page - 1, query);
		cafe.logo = doPathToImage(cafe.logo);
		for (const dish of cafe.dishes) {
			dish.img = doPathToImage(dish.img);
		}
		return cafe;
	}
}

export { CafeService };
