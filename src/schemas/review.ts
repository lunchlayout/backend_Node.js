import { Schema, Document, model } from "mongoose";

interface IReview {
    rate: 1 | 2 | 3 | 4,
    text: string
}

interface IReviewDocument extends IReview, Document {}

const ReviewSchema = new Schema<IReviewDocument>({
    rate: {
        type: Number,
        required: true,
        trim: true
    },
    text: {
        type: String,
        required: true,
        trim: true
    }
}, {
    collection: 'reviews',
    versionKey: false,
    strict: true
})

const ReviewModel = model('Review', ReviewSchema);

export {ReviewModel, ReviewSchema, IReview, IReviewDocument}