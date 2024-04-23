import { isValidObjectId } from 'mongoose'
import {number, object, string} from 'yup'

const оbjectId = string().test({
    name: 'isObjectId',
    message: '${path} must be objectId',
    test: value => isValidObjectId(value)
})

const queryDishesSchema = object({
    cafeId: оbjectId.required('cafeId is a required field'),
    query: string().default(''),
    page: number().min(1, 'Page number greater than one').default(1)
})

export {queryDishesSchema}