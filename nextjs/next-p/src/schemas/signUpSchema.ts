import { z } from 'zod'

export const verifyUsername = z.string().min(5).max(25).regex(/^[a-zA-Z0-9]+$/,{error:'username must not contain any special characters'})
export const verifyEmail = z.email({ error: 'please enter a valid email address' })
export const verifyPassword = z.string().min(6)

export const signUpSchema = z.object({
    username: verifyUsername,
    password: verifyPassword,
    email:verifyEmail
})
