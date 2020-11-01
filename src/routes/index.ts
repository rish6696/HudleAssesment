import express,{ Router } from 'express'
import { authRouter  } from './Auth.Router'
import { employerRouter } from './Employers.Router'
import { employeeRouter  } from './Employee.Router'

export const router : Router = express.Router() 

router.use('/auth',authRouter)
router.use('/employer',employerRouter)
router.use('/employee',employeeRouter)



