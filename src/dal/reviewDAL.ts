import { logger } from "../lib/logger.js";
import { IReview, ReviewModel } from "../schemas/review.js";

class ReviewDAL {
	static async sendReview(review: IReview) {
		const { id } = await ReviewModel.create(review);
		logger.info(`Review created. ReviewId: ${id}`);
		return id;
	}
}

export { ReviewDAL };
