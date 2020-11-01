import { dB } from "../utilities/databaseService";
import { STRING, INTEGER, DATE,ARRAY } from "sequelize";
import { defineEntity } from "./modelHelper";


export const JobModel = dB.define("jobs", {
  title: defineEntity(STRING, false, false),
  experience: defineEntity(INTEGER, false, false),
  created_date: defineEntity(DATE, false, false),
  annual_salary: defineEntity(INTEGER, false, false),
  notice_period: defineEntity(INTEGER, false, false),
  industry: defineEntity(INTEGER, false, false),
  qualification: defineEntity(STRING, false, false),
  skills: defineEntity(ARRAY(STRING),false,false),
  status: defineEntity(INTEGER,false,false),
  location: defineEntity(STRING,false,false)
});


