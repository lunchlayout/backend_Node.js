import { Schema, Document, model } from "mongoose";

interface IQuestion {
    dishId: Schema.Types.ObjectId,
    text: string,
    answer: string,
    options: string[]
}

interface IQuetionDocument extends IQuestion, Document {}

const QuetionSchema = new Schema<IQuetionDocument>({
    dishId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'dishes'
    },
    text: {
        type: String,
        required: true,
        trim: true
    },
    answer: {
        type: String,
        required: true,
        trim: true
    },
    options: {
        type: [String],
        required: true
    },

}, {
    collection: 'quetions',
    versionKey: false,
    strict: true
})

const QuetionModel = model('Quetion', QuetionSchema);

export {QuetionModel, QuetionSchema, IQuestion}