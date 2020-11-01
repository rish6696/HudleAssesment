import { dB } from "../utilities/databaseService";
import { STRING, DATE } from "sequelize";
import { defineEntity } from "./modelHelper";
import { ARRAY } from "sequelize";
import { NUMBER } from "sequelize";
import { INTEGER } from "sequelize";
import { JobModel } from "./job";

export const EmployersModel = dB.define("employers", {
  name: defineEntity(STRING, false, false),
  email: defineEntity(STRING, false, true),
  password: defineEntity(STRING, false, false),
  date_of_establishment: defineEntity(DATE, false, false),
  location: defineEntity(STRING, false, false),
  industry :defineEntity(ARRAY(INTEGER),false,false)
});



