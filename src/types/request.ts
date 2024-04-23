import { Request } from "express";
import { IReview } from "../schemas/review";

interface ISendReviewReq extends Request<undefined, {insertedId: string}, IReview> {}

interface IGetDishByIdReq extends Request<{dishId: string}> {}

interface IGetDishesReq extends Request<undefined, undefined, undefined, {cafeId: string, query: string, page: number}> {}

interface IGetCafeReq extends Request<{cafeId: string}> {}

export { ISendReviewReq, IGetDishByIdReq, IGetCafeReq, IGetDishesReq }