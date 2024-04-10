import { Schema, Document, model } from "mongoose";

interface IReview {
    rate: 1 | 2 | 3 | 4,
    text: string
}

interface IReviewDocument extends IReview, Document {}

const reviewSchema = new Schema<IReviewDocument>({
    rate: {
        require: true,
        trim: true
    },
    text: {
        require: true,
        trim: true
    }
}, {
    collection: 'reviews',
    versionKey: false,
    strict: true
})

const reviewModel = model('Review', reviewSchema);

export {reviewModel, reviewSchema, IReview, IReviewDocument}