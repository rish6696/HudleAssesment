import Joi,{ number, ObjectSchema } from 'joi'
import { join } from 'path'
import { GENDER,INDUSTRIES  } from '../constants'


export const signUpEmployeeValidator:ObjectSchema=Joi.object({
    name:Joi.string().required() ,
    email: Joi.string().required(),
    password: Joi.string().required(),
    experience: Joi.number().required(),
    gender: Joi.required().valid(...Object.keys(GENDER)),
    dateOfBirth: Joi.string().required(),
    location: Joi.string().required(),
    currentAnnualSalary: Joi.number().required(),
    expectedAnnualSalary: Joi.number().required(),
    noticePeriod: Joi.number().required(),
    industry: Joi.number().required(),
    resumeName: Joi.string().required(),
    qualification: Joi.string().required(),
    skills: Joi.array().items(Joi.string()) .required(),
    instituteName : Joi.string().required()
})

export const signUpEmployerValidator:ObjectSchema=Joi.object({
    name:Joi.string().required() ,
    email: Joi.string().required(),
    password: Joi.string().required(),
    dateOfEstablishment: Joi.string().required(),
    location: Joi.string().required(),
    industry: Joi.array().items(number()),
})

export const loginValidator:ObjectSchema=Joi.object({
    email:Joi.string().required(),
    password:Joi.string().required()
})

