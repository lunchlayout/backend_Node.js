import { isValidObjectId } from 'mongoose'
import {number, object, string} from 'yup'

const оbjectId = string().test({
    name: 'isObjectId',
    message: '${path} must be objectId',
    test: value => {
        return isValidObjectId(value)
    }
})

const queryDishesSchema = object({
    cafeId: оbjectId.required('cafeId is a required field'),
    q: string().default(''),
    p: number().default(0)
})

export {queryDishesSchema}