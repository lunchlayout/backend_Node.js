import { Types } from "mongoose";
import { CafeModel, ICafe } from "../schemas/cafe.js";
import { DishModel, IDish } from "../schemas/dish.js";
import { APIError } from "../errors/APIError.js";
import { ITEMS_PER_PAGE } from "../consts/pagination.js";
import { PaginationWizard } from "pagination-wizard";

class CafeDAL {
	static async getCafeById(cafeId: string, page: number, query: string) {
		const cafeInfo = (await CafeModel.findById(cafeId)
			.select("-_id")
			.lean()) as ICafe;
		if (!cafeInfo) throw APIError.NotFound();
		const defaultRes = {
			pageCnt: 0,
			dishes: [],
			...cafeInfo,
		};
		const queryRegexp = new RegExp(`.*${query.replace(/'/g, "")}.*`, "i");
		const itemCount = await DishModel.countDocuments({
			cafeId,
			name: { $regex: queryRegexp },
		});
		if (!itemCount) {
			return defaultRes;
		}
		const pageWizard = new PaginationWizard(itemCount, ITEMS_PER_PAGE);
		const itemsOnPage = pageWizard.pageItemCount(page);
		if (itemsOnPage === -1) throw APIError.BadRequest();

		const dishes = (await DishModel.find({
			cafeId,
			name: { $regex: queryRegexp },
		})
			.skip(page * ITEMS_PER_PAGE)
			.limit(itemsOnPage)
			.select("_id name amount unit img")
			.lean()) as (Pick<IDish, "name" | "amount" | "unit" | "img"> & {
			_id: Types.ObjectId;
		})[];

		if (!dishes.length) throw APIError.NotFound();

		const dishesWithId = dishes.map(dish => ({
			...dish,
			dishId: dish._id,
			_id: undefined,
		}));

		const cafe = {
			...cafeInfo,
			pageCnt: pageWizard.pageCount(),
			dishes: dishesWithId,
		};
		return cafe;
	}
}

export { CafeDAL };
