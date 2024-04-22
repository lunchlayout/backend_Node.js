import { Schema, Document, model } from "mongoose";

interface INutritionalValue {
    calories: number,
    proteins: number,
    fats: number,
    carbohydrates: number
}

interface INutritionalValueDocument extends INutritionalValue, Document {}

const NutritionalValueSchema = new Schema<INutritionalValueDocument>({
    calories: {
        type: Number,
        required: true,
    },
    proteins: {
        type: Number,
        required: true,
    },
    fats: {
        type: Number,
        required: true,
    },
    carbohydrates: {
        type: Number,
        required: true,
    },

})

type Unit = "ml" | "g"

interface IDish {
    cafeId: Schema.Types.ObjectId,
    name: string,
    description: string,
    amount: number,
    unit: Unit,
    img: string,
    ingredients: string[],
    allergens: string[],
    nutritionalValue: INutritionalValue
}

interface IDishDocument extends IDish, Document {}

const DishSchema = new Schema<IDishDocument>({
    cafeId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'cafes'
    },
    name: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    amount: {
        type: Number,
        required: true
    },
    unit: {
        type: String,
        required: true,
        trim: true
    },
    img: {
        type: String,
        required: true,
        trim: true
    },
    ingredients: {
        type: [String],
        required: true
    },
    allergens: {
        type: [String],
        required: true
    },
    nutritionalValue: {
        type: NutritionalValueSchema,
        required: true
    }

}, {
    collection: 'dishes',
    versionKey: false,
    strict: true
})

const DishModel = model('Dish', DishSchema);

export {DishModel, DishSchema, IDish, IDishDocument, INutritionalValue}