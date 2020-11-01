import { NextFunction, Request, Response } from "express";
import { JOB_ACTIVE } from "../constants";
import { EmployeesModel } from "../models/employees";
import { JobModel } from "../models/job";
import { JobEmployeeMap } from "../models/jobEmployeeMap";
import { APIError } from "../utilities/APIError";
import { generateError, UNEXPECTED_ERROR } from "../utilities/errorConstants";
import { logger } from "../utilities/logger";

export const postJobController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const {
      title,
      experience,
      annualSalary,
      noticePeriod,
      industry,
      qualification,
      skills,
      location,
    } = req.body;

    await JobModel.sync();

    const response = await JobModel.create({
      title,
      experience,
      created_date: new Date(),
      annual_salary: annualSalary,
      notice_period: noticePeriod,
      industry,
      qualification,
      skills,
      status: JOB_ACTIVE,
      location,
      employerId: req.body.id,
    });
    logger.info(` Employer created with job id ${response.getDataValue("id")}`);
    res.send({ status: true });
  } catch (error) {
    logger.error(`error in creating new Employer - ${generateError(error)}`);
    return next(new APIError(505, UNEXPECTED_ERROR));
  }
};

export const getEmployeeController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { jobId } = req.params;

  try {
    await JobEmployeeMap.sync();
    const response = await JobEmployeeMap.findAll({
      where: { jobId: jobId },
      include: [{ model: EmployeesModel }],
    });

    res.send({ status: true, data: response });
  } catch (error) {
    logger.error(
      `error in getting applied employees  -error= ${generateError(error)} `
    );
    return next(new APIError(505, UNEXPECTED_ERROR));
  }
};

export const updateApplicationStatus = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { jobId, employeeId, status } = req.params;

  try {
    await JobEmployeeMap.sync();
    await JobEmployeeMap.update({ status }, { where: { jobId, employeeId } });
    return res.send({ status: true });
  } catch (error) {
    logger.error(`error while generating   -error= ${generateError(error)} `);
    return next(new APIError(505, UNEXPECTED_ERROR));
  }
};
