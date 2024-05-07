import { Schema, Document, model } from "mongoose";

interface IQuiz {
    dishId: Schema.Types.ObjectId,
    question: string,
    answer: string,
    options: string[]
}

interface IQuizDocument extends IQuiz, Document {}

const QuizSchema = new Schema<IQuizDocument>({
    dishId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'dishes'
    },
    question: {
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
    collection: 'quizzes',
    versionKey: false,
    strict: true
})

const QuizModel = model('Quiz', QuizSchema);

export {QuizModel, QuizSchema, IQuiz}