import joi from 'joi'

export const commentValidator=joi.object({
    name:joi.string().required().min(10),
    content:joi.string().required(),
    isApproved:joi.boolean().required(),

})