import joi from 'joi'

export const loginValidator=joi.object({
    email:joi.string().required(),
    password:joi.string().required(),
})