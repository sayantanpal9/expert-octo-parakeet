import {z} from 'zod'

export const messageValidation = z.object({
    content :z.string()
})
