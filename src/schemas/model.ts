import { Schema, Document, model } from "mongoose";

interface IModel {
	dishId: Schema.Types.ObjectId;
	modelLink: string;
}

interface IModelDocument extends IModel, Document {}

const ModelSchema = new Schema<IModelDocument>(
	{
		dishId: {
			type: Schema.Types.ObjectId,
			required: true,
			ref: "dishes",
		},
		modelLink: {
			type: String,
			required: true,
			trim: true,
			unique: true,
		},
	},
	{
		collection: "models",
		versionKey: false,
		strict: true,
	},
);

const ModelModel = model("Model", ModelSchema);

export { ModelModel, ModelSchema, IModel };
