import { Schema, Document, model } from "mongoose";

interface IFact {
    description: string,
    img: string
}
interface IFactDocument extends IFact, Document {}

interface IVideo {
    title: string,
    src: string
}
interface IVideoDocument extends IVideo, Document {}

const FactSchema = new Schema<IFactDocument>({
    description: {
        type: String,
        required: true,
        trim: true
    },
    img: {
        type: String,
        required: true,
        trim: true
    }

})

const VideoSchema = new Schema<IVideoDocument>({
    title: {
        type: String,
        required: true,
        trim: true
    },
    src: {
        type: String,
        required: true,
        trim: true
    }

})

interface IDishContent {
    dishId: Schema.Types.ObjectId,
    modelSrc: string,
    facts: IFact[],
    videos: IVideo[]
}

interface IDishContentDocument extends IDishContent, Document {}

const DishContentSchema = new Schema<IDishContentDocument>({
    dishId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'dishes'
    },
    modelSrc: {
        type: String,
        required: true,
        trim: true
    },
    facts: {
        type: [FactSchema],
        required: true
    },
    videos: {
        type: [VideoSchema],
        required: true
    }

}, {
    collection: 'dishContents',
    versionKey: false,
    strict: true
})

const DishContentModel = model('DishContent', DishContentSchema);

export {DishContentModel, DishContentSchema, IDishContent, IDishContentDocument, IVideo, IFact}