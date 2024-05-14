import { DishModel, IDish } from "../schemas/dish.js";
import { IModel, ModelModel } from "../schemas/model.js";

import { APIError } from "../errors/APIError.js";

import { IStory, StoryModel } from "../schemas/story.js";
import { IVideo, VideoModel } from "../schemas/video.js";
import { IQuiz, QuizModel } from "../schemas/quiz.js";
import { CafeModel, ICafe } from "../schemas/cafe.js";

class DishDAL {
	static async getDishById(dishId: string) {
		const dish = (await DishModel.findById(dishId)
			.select("-_id")
			.lean()) as IDish;
		if (!dish) throw APIError.NotFound();
		const cafe = (await CafeModel.findById(dish.cafeId)
		.select("-_id logo name")
		.lean()) as Pick<ICafe, 'logo' | 'name'>;
		const model = (await ModelModel.findOne({ dishId })
			.select("-_id -dishId")
			.lean()) as Omit<IModel, "dishId">;
		const stories = (await StoryModel.find({ dishId })
			.select("-_id -dishId")
			.lean()) as Omit<IStory, "dishId">[];
		const videos = (await VideoModel.find({ dishId })
			.select("-_id -dishId")
			.lean()) as Omit<IVideo, "dishId">[];
		const quizzes = (await QuizModel.find({ dishId })
			.select("-_id -dishId")
			.lean()) as Omit<IQuiz, "dishId">[];

		const dishDTO = {
			...dish,
			cafeId: undefined,
			cafe: {
				...cafe,
				cafeId: dish.cafeId
			},
			modelLink: model.link,
			entertainment: {
				stories,
				videos,
				quizzes,
			},
		};

		return dishDTO;
	}
}

export { DishDAL };
