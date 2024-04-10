import { IReview, ReviewModel } from "../schemas/review.js";


class ReviewDAL {
    static async sendReview(review: IReview) {
        const {id} = await ReviewModel.create(review);
        return id;
    }
}

export {ReviewDAL}