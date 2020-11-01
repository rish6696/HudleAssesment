import express,{ Router } from 'express'
import { createValidator,ExpressJoiInstance } from 'express-joi-validation'
import { loginValidator, signUpEmployeeValidator, signUpEmployerValidator  } from '../validators/Auth.validator'
import {loginController, signUpEmployeeController, signUpEmployerController,logoutController}  from '../controllers/Auth.controller'


const validator:ExpressJoiInstance = createValidator({})
 
export const authRouter : Router = express.Router();


authRouter.route('/register/employee')
.post(validator.body(signUpEmployeeValidator),signUpEmployeeController )

authRouter.route('/register/employer')
.post(validator.body(signUpEmployerValidator),signUpEmployerController)

authRouter.route('/login/employee')
.post(validator.body(loginValidator),loginController)

authRouter.route('/login/employer')
.post(validator.body(loginValidator),loginController)

authRouter.route('/logout')
.get(logoutController)



