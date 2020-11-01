import { dB } from "../utilities/databaseService";
import { STRING, INTEGER, DATE,ARRAY } from "sequelize";
import { defineEntity } from "./modelHelper";
import { signUpEmployeeBody } from "../interfaces/AuthInterface";
import { JobEmployeeMap } from "./jobEmployeeMap";

export const EmployeesModel = dB.define("employees", {
  name: defineEntity(STRING, false, false),
  email: defineEntity(STRING, false, true),
  password: defineEntity(STRING, false, false),
  experience: defineEntity(INTEGER, false, false),
  gender: defineEntity(INTEGER, false, false),
  date_of_birth: defineEntity(DATE, false, false),
  location: defineEntity(STRING, false, false),
  current_annual_salary: defineEntity(INTEGER, false, false),
  expected_annual_salary: defineEntity(INTEGER, false, false),
  notice_period: defineEntity(INTEGER, false, false),
  industry: defineEntity(INTEGER, false, false),
  resume_name: defineEntity(STRING, false, false),
  qualification: defineEntity(STRING, false, false),
  skills: defineEntity(ARRAY(STRING),false,false),
  institute_name : defineEntity(STRING,false,false)
});


