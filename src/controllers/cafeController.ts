import { NextFunction, Response } from "express";
import { IGetCafeByIdReq, IGetCafesReq } from "../types/request";
import { CafeService } from "../services/index.js";
import { isValidObjectId } from "mongoose";
import { APIError } from "../errors/APIError.js";
import { QueryCafeSchema } from "../validations/queryValidator.js";

class CafeController {
	static async getCafeById(
		req: IGetCafeByIdReq,
		res: Response,
		next: NextFunction,
	) {
		try {
			const { cafeId } = req.params;
			if (!isValidObjectId(cafeId)) {
				throw APIError.NotFound();
			}

			const { page, query } = await QueryCafeSchema.validate(req.query);

			const cafe = await CafeService.getCafeById(cafeId, page, query);
			return res.status(200).json(cafe);
		} catch (error) {
			next(error);
		}
	}
	static async getCafes(
		req: IGetCafesReq,
		res: Response,
		next: NextFunction,
	) {
		try {
			const { page, query } = await QueryCafeSchema.validate(req.query);

			const cafes = await CafeService.getCafes(page, query);
			return res.status(200).json(cafes);
		} catch (error) {
			next(error);
		}
	}
}

export { CafeController };
