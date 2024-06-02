import { Request } from "express";
import { IReview } from "../schemas/review";

interface ISendReviewReq
	extends Request<undefined, { insertedId: string }, IReview> {}

interface IGetDishByIdReq extends Request<{ dishId: string }> {}

interface IGetCafeByIdReq
	extends Request<
		{ cafeId: string },
		undefined,
		undefined,
		{ query: string; page: number }
	> {}

interface IGetCafesReq
	extends Request<
		undefined,
		undefined,
		undefined,
		{ query: string; page: number }
	> {}

export { ISendReviewReq, IGetDishByIdReq, IGetCafeByIdReq, IGetCafesReq };
