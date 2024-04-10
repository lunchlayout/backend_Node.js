import { Request, Response } from "express";
import { ISendReviewReq } from "../types/request";
import { ReviewService } from "../services/index.js";



class ReviewController {
    static async sendReview(req: ISendReviewReq, res: Response) {
        try {
            const review = req.body;
            const insertedId = await ReviewService.sendReview(review);
            return res.status(200).json({insertedId})
        } catch (error) {
            
        }
    }
}

export {ReviewController}