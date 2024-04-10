import { Schema, Document, model } from "mongoose";


interface ICafe {
    name: string,
    logo: string
}

interface ICafeDocument extends ICafe, Document {}

const cafeSchema = new Schema<ICafeDocument>({
    name: {
        require: true,
        unique: true,
        trim: true
    },
    logo: {
        require: true,
        unique: true,
        trim: true
    }
}, {
    collection: 'cafes',
    versionKey: false,
    strict: true
})

const cafeModel = model('Cafe', cafeSchema);

export {cafeModel, cafeSchema, ICafe, ICafeDocument}
