import Joi,{ number, ObjectSchema } from 'joi'
import { join } from 'path'
import { GENDER,INDUSTRIES  } from '../constants'

export const postJobValidator:ObjectSchema=Joi.object({
    title: Joi.string().required(),
    experience: Joi.number().required(),
    annualSalary: Joi.number().required(),
    noticePeriod: Joi.number().required(),
    industry: Joi.number().required(),
    qualification:Joi.string().required(),
    skills: Joi.array().items(Joi.string()) .required(),
    location: Joi.string().required(),
})

