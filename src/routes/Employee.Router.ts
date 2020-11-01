import express,{ Router } from 'express'
import { createValidator,ExpressJoiInstance } from 'express-joi-validation'
import {getJobController,applyJobController,getAppliedJobController  } from '../controllers/Employee.Controller';
import { verifyJwtToken } from '../middlewares/authMiddleware'


const validator:ExpressJoiInstance = createValidator({})
 
export const employeeRouter : Router = express.Router();

employeeRouter.route('/job')
.get( verifyJwtToken,getJobController )

employeeRouter.route('/job/apply/:jobId')
.post(verifyJwtToken,applyJobController)


employeeRouter.route('/job/apply')
.get(verifyJwtToken,getAppliedJobController)





