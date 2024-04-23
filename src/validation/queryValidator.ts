import {number, object, string} from 'yup'

const queryCafeSchema = object({
    query: string().default(''),
    page: number().min(1, 'Page number greater than one').default(1)
})

export {queryCafeSchema}