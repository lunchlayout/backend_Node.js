import { ReviewDAL } from "../dal/index.js";
import { IReview } from "../schemas/review.js";

class ReviewService {
	static async sendReview(review: IReview) {
		const insertedId = await ReviewDAL.sendReview(review);
		return insertedId;
	}
}

export { ReviewService };
