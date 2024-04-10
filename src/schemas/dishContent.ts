import { Schema, Document, model, Types } from "mongoose";

interface IFact {
    description: string,
    img: string
}
interface IVideo {
    title: string,
    src: string
}

interface IDishContent {
    dishId: Types.ObjectId,
    modelSrc: string,
    facts: IFact[],
    videos: IVideo[]
}

interface IDishContentDocument extends IDishContent, Document {}

const dishContentSchema = new Schema<IDishContentDocument>({
    dishId: {
        ref: 'dishes',
        require: true
    },
    modelSrc: {
        require: true,
        trim: true
    },
    facts: {
        require: true
    },
    videos: {
        required: true
    }

}, {
    collection: 'dishContents',
    versionKey: false,
    strict: true
})

const dishContentModel = model('DishContent', dishContentSchema);

export {dishContentModel, dishContentSchema, IDishContent, IDishContentDocument}