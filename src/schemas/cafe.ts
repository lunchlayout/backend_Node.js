import { Schema, Document, model } from "mongoose";


interface ICafe {
    name: string,
    logo: string
}

interface ICafeDocument extends ICafe, Document {}

const CafeSchema = new Schema<ICafeDocument>({
    name: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    logo: {
        type: String,
        required: true,
        unique: true,
        trim: true
    }
}, {
    collection: 'cafes',
    versionKey: false,
    strict: true
})

const CafeModel = model('Cafe', CafeSchema);

export {CafeModel, CafeSchema, ICafe, ICafeDocument}
