import { Schema, Document, model, Types } from "mongoose";

interface IKBZHU {
    calories: number,
    proteins: number,
    fats: number,
    carbohydrates: number
}

interface IDish {
    cafeId: Types.ObjectId,
    name: string,
    description: string,
    price: number,
    ingredients: string[],
    allergens: string[],
    kbzhu: IKBZHU

}

interface IDishDocument extends IDish, Document {}

const dishSchema = new Schema<IDishDocument>({
    cafeId: {
        ref: 'cafes',
        require: true
    },
    name: {
        require: true,
        trim: true
    },
    description: {
        require: true,
        trim: true
    },
    price: {
        require: true,
        trim: true
    },
    ingredients: {
        require: true
    },
    allergens: {
        required: true
    }

}, {
    collection: 'dishes',
    versionKey: false,
    strict: true
})

const dishModel = model('Dish', dishSchema);

export {dishModel, dishSchema, IDish, IDishDocument}