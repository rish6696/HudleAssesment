import { INTEGER } from "sequelize";
import { dB } from "../utilities/databaseService";
import { defineEntity } from "./modelHelper";

export const JobEmployeeMap = dB.define("job_employee_map", {
  status: defineEntity(INTEGER, false, false),
});
