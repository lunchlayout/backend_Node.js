import { Types } from "mongoose";
import { CafeModel, ICafe } from "../schemas/cafe.js";
import { DishModel, IDish } from "../schemas/dish.js";
import { APIError } from "../errors/APIError.js";
import { ITEMS_PER_PAGE } from "../consts/pagination.js";
import { PaginationWizard } from "pagination-wizard";
import { getQueryRegExp } from "../lib/index.js";

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
		const queryRegexp = getQueryRegExp(query);
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
			.select("_id name amount unit img description")
			.sort({ name: -1 })
			.lean()) as (Pick<
			IDish,
			"name" | "amount" | "unit" | "img" | "description"
		> & {
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
	static async getCafes(page: number, query: string) {
		const defaultRes = {
			pageCnt: 0,
			cafes: [],
		};
		const queryRegexp = getQueryRegExp(query);
		const itemCount = await CafeModel.countDocuments({
			name: { $regex: queryRegexp },
		});
		if (!itemCount) {
			return defaultRes;
		}
		const pageWizard = new PaginationWizard(itemCount, ITEMS_PER_PAGE);
		const itemsOnPage = pageWizard.pageItemCount(page);
		if (itemsOnPage === -1) throw APIError.BadRequest();

		const cafes = (await CafeModel.find({
			name: { $regex: queryRegexp },
		})
			.skip(page * ITEMS_PER_PAGE)
			.limit(itemsOnPage)
			.sort({ name: -1 })
			.lean()) as (Pick<ICafe, "logo" | "name"> & {
			_id: Types.ObjectId;
		})[];

		if (!cafes.length) throw APIError.NotFound();

		const cafesWithId = cafes.map(cafe => ({
			...cafe,
			cafeId: cafe._id,
			_id: undefined,
		}));

		const cafesRes = {
			pageCnt: pageWizard.pageCount(),
			cafes: cafesWithId,
		};
		return cafesRes;
	}
}

export { CafeDAL };
