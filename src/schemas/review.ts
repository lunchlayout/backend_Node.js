import { Schema, Document, model } from "mongoose";

type Rating = 1 | 2 | 3 | 4;

interface IReview {
	rating: Rating;
	comment: string;
}

interface IReviewDocument extends IReview, Document {}

const ReviewSchema = new Schema<IReviewDocument>(
	{
		rating: {
			type: Number,
			required: true,
			trim: true,
		},
		comment: {
			type: String,
			trim: true,
		},
	},
	{
		collection: "reviews",
		versionKey: false,
		strict: true,
	},
);

const ReviewModel = model("Review", ReviewSchema);

export { ReviewModel, ReviewSchema, IReview, IReviewDocument };
