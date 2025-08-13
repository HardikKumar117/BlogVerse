import joi from 'joi'

export const registerValidator=joi.object({
    username:joi.string().min(3),
    email:joi.string().required(),
    password:joi.string().required(),
})