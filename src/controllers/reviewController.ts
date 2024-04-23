import { NextFunction, Request, Response } from "express";
import { ISendReviewReq } from "../types/request";
import { ReviewService } from "../services/index.js";

class ReviewController {
    static async sendReview(req: ISendReviewReq, res: Response, next: NextFunction) {
        try {
            const review = req.body;
            const insertedId = await ReviewService.sendReview(review);
            return res.status(201).location(`/reviews/${insertedId}`).json({})
        } catch (error) {
            next(error)
        }
    }
}

export {ReviewController}