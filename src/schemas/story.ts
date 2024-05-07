import { Schema, Document, model } from "mongoose";

interface IStory {
	dishId: Schema.Types.ObjectId;
	description: string;
	img: string;
}
interface IStoryDocument extends IStory, Document {}

const StorySchema = new Schema<IStoryDocument>(
	{
		dishId: {
			type: Schema.Types.ObjectId,
			required: true,
			ref: "dishes",
		},
		description: {
			type: String,
			required: true,
			trim: true,
		},
		img: {
			type: String,
			required: true,
			trim: true,
		},
	},
	{
		collection: "stories",
		versionKey: false,
		strict: true,
	},
);

const StoryModel = model("Story", StorySchema);

export { StoryModel, StorySchema, IStory };
