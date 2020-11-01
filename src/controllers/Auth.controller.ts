import { Request, Response, NextFunction } from "express";
import { env, jwtSecretKey } from "../config";
import {
  AUTH_COOKIE_KEY,
  DB_DATE_FORMAT,
  GENDER,
  INDUSTRIES,
  USER_TYPE_EMPLOYEE,
  USER_TYPE_EMPLOYER,
} from "../constants";
import {
  signUpEmployeeBody,
  signUpEmployerBody,
  loginBody,
} from "../interfaces/AuthInterface";
import { EmployeesModel } from "../models/employees";
import { EmployersModel } from "../models/employers";
import { APIError } from "../utilities/APIError";
import {
  UNEXPECTED_ERROR,
  generateError,
  UNAUTHORIZED_REQUEST,
  WRONG_PASSWORD,
  USER_NOT_FOUND,
} from "../utilities/errorConstants";
import { logger } from "../utilities/logger";
import moment from "moment";
import { saltRound } from "../config";
import Bcrypt from "bcrypt";
import { Model } from "sequelize/types";
import JWT from "jsonwebtoken";

export const signUpEmployeeController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const {
    name,
    email,
    password,
    experience,
    gender,
    dateOfBirth,
    location,
    currentAnnualSalary,
    expectedAnnualSalary,
    noticePeriod,
    industry,
    resumeName,
    qualification,
    skills,
    instituteName,
  } = req.body as signUpEmployeeBody;

  try {
    const hashedPassword = await Bcrypt.hash(password, parseInt(saltRound));

    await EmployeesModel.sync();

    await EmployeesModel.create({
      name,
      email,
      password: hashedPassword,
      experience,
      gender: gender == "Male" ? 0 : 1,
      date_of_birth: moment(dateOfBirth, DB_DATE_FORMAT),
      location,
      current_annual_salary: currentAnnualSalary,
      expected_annual_salary: expectedAnnualSalary,
      notice_period: noticePeriod,
      industry,
      resume_name: resumeName,
      qualification,
      skills,
      institute_name: instituteName,
    });

    logger.info(` Employee created  Successfully with email id ${email}`);

    res.send({ status: true });
  } catch (error) {
    logger.error(`error in creating new Employee - ${generateError(error)}`);
    return next(new APIError(505, UNEXPECTED_ERROR));
  }
};

export const signUpEmployerController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const {
    name,
    email,
    password,
    location,
    industry,
    dateOfEstablishment,
  } = req.body as signUpEmployerBody;

  try {
    const hashedPassword = await Bcrypt.hash(password, parseInt(saltRound));
    await EmployersModel.sync();

    await EmployersModel.create({
      name,
      email,
      password: hashedPassword,
      date_of_establishment: moment(dateOfEstablishment, DB_DATE_FORMAT),
      location,
      industry,
    });

    logger.info(` Employer created  Successfully with email id ${email}`);

    res.send({ status: true });
  } catch (error) {
    logger.error(`error in creating new Employer - ${generateError(error)}`);
    return next(new APIError(505, UNEXPECTED_ERROR));
  }
};

export const loginController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const path = req.path;
    const { email, password } = req.body as loginBody;

    let response, userType;
    if (path.split("/").slice(-1).pop() !== "employee") {
      response = await EmployersModel.findOne({ where: { email } });
      userType = USER_TYPE_EMPLOYER;
    } else {
      response = await EmployeesModel.findOne({ where: { email } });
      userType = USER_TYPE_EMPLOYEE;
    }


    if (!response)
      return next(new APIError(401, USER_NOT_FOUND));
    
    const dbPassword = response?.getDataValue("password");
    const id = response?.getDataValue("id");

    const verify = await Bcrypt.compare(password, dbPassword);

    if (verify == true) {
      const token = JWT.sign({ id, userType }, jwtSecretKey);
      res.cookie(AUTH_COOKIE_KEY, token, { httpOnly: true });
      res.send({ status: true });
    } else {
      return next(new APIError(401, WRONG_PASSWORD));
    }
  } catch (error) {
    logger.error(`Error while login ${generateError(error)}`);
    next(new APIError(500, UNEXPECTED_ERROR ));
  }
};

export const logoutController =(req:Request,res:Response,next:NextFunction)=>{
  res.clearCookie(AUTH_COOKIE_KEY)
  res.send({status:true})
}
