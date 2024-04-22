import { Schema, Document, model } from "mongoose";

interface IVideo {
    dishId: Schema.Types.ObjectId,
    title: string,
    link: string
}
interface IVideoDocument extends IVideo, Document {}

const VideoSchema = new Schema<IVideoDocument>({
    dishId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'dishes'
    },
    title: {
        type: String,
        required: true,
        trim: true
    },
    link: {
        type: String,
        required: true,
        trim: true
    }

}, {
    collection: 'videos',
    versionKey: false,
    strict: true
})

const VideoModel = model('Video', VideoSchema);

export {VideoModel, VideoSchema, IVideo}