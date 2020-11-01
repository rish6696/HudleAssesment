import Joi,{ ObjectSchema } from 'joi'
import {INDUSTRIES} from '../constants'

export  interface signUpEmployeeBody {
    name:string ,
    email: string,
    password: string,
    experience: number,
    gender: string,
    dateOfBirth: string,
    location: string,
    currentAnnualSalary: number,
    expectedAnnualSalary: number,
    noticePeriod: number,
    industry: number,
    resumeName: string,
    qualification: string,
    skills: string [],
    instituteName : string
}

export  interface signUpEmployerBody {
    name:string ,
    email: string,
    password: string,
    dateOfEstablishment: string,
    industry: number[],
    location:string
}

export interface loginBody{
    email:string,
    password: string
}




