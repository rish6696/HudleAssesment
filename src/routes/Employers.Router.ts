import express,{ Router } from 'express'
import { createValidator,ExpressJoiInstance } from 'express-joi-validation'
import { getEmployeeController, postJobController, updateApplicationStatus } from '../controllers/Employer.Controller';
import { verifyJwtToken } from '../middlewares/authMiddleware'
import { postJobValidator } from '../validators/EmployerValidator';


const validator:ExpressJoiInstance = createValidator({})
 
export const employerRouter : Router = express.Router();

employerRouter.route('/job')
.post(validator.body( postJobValidator),verifyJwtToken,postJobController)

employerRouter.route('/employees/:jobId')
.get(verifyJwtToken,getEmployeeController)

employerRouter.route('/update/job/:jobId/:employeeId/:status')
.patch(verifyJwtToken,updateApplicationStatus)









