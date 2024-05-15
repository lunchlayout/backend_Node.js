import { number, object, string } from "yup";
import { IReview } from "../schemas/review";

const ReviewSchema = object({
	comment: string<IReview["comment"]>().default(""),
	rating: number<IReview["rating"]>()
		.required("Rating is a required field")
		.oneOf([1, 2, 3, 4], "Rating is between 1 and 4"),
});

export { ReviewSchema };
