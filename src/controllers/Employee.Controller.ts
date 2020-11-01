import { NextFunction, Request, Response } from "express";
import { JOB_ACTIVE, JOB_STATUS } from "../constants";
import { JobModel } from "../models/job";
import { JobEmployeeMap } from "../models/jobEmployeeMap";
import { APIError } from "../utilities/APIError";
import { generateError, UNEXPECTED_ERROR } from "../utilities/errorConstants";
import { logger } from "../utilities/logger";

export const getJobController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.body;
  const { industry } = req.query;
  console.log(req.query);
  try {
    await JobModel.sync();
    const response = await JobModel.findAll({ where: { industry } });
    res.send({ status: true, data: response });
  } catch (error) {
    logger.error(`error in finding jobs for employee with id  - ${id} Error= ${generateError(error)} `);
    return next(new APIError(505, UNEXPECTED_ERROR));
  }
};

export const applyJobController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { jobId } = req.params;
  const { id } = req.body;

  try {
    await JobEmployeeMap.sync();
    await JobEmployeeMap.create({
      jobId,
      employeeId: id,
      status:JOB_STATUS.IN_REVIEW
    });

    logger.info(`Applied by employee with id ${id} for jobId ${jobId}`)
    res.send({status:true})
  } catch (error) {
    logger.error(`error in apply job for employee with id   - ${id} error= ${generateError(error)} `);
    return next(new APIError(505, UNEXPECTED_ERROR));
  }
};


export const getAppliedJobController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {

  const { id } = req.body;

  try {
    await JobEmployeeMap.sync();
    const response =await JobEmployeeMap.findAll({
      where:{employeeId:id},include:[{model:JobModel}]
    })

    res.send({status:true,data:response})
  } catch (error) {
    logger.error(`error in finding  job for employee with id   - ${id} error= ${generateError(error)} `);
    return next(new APIError(505, UNEXPECTED_ERROR));
  }
};
