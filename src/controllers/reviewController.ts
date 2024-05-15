import { NextFunction, Response } from "express";
import { ISendReviewReq } from "../types/request";
import { ReviewService } from "../services/index.js";
import { ReviewSchema } from "../validations/reviewValidator.js";
import { ValidationError } from "yup";
import { logger } from "../lib/index.js";

class ReviewController {
	static async sendReview(
		req: ISendReviewReq,
		res: Response,
		next: NextFunction,
	) {
		try {
			const review = await ReviewSchema.validate(req.body);
			const insertedId = await ReviewService.sendReview(review);
			return res.status(201).location(`/reviews/${insertedId}`).json();
		} catch (error) {
			if (error instanceof ValidationError) {
				logger.error(
					`Review is invalid. Error: ${error.message}. Body: ${JSON.stringify(req.body)}`,
				);
			}
			next(error);
		}
	}
}

export { ReviewController };
