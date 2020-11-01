import { Sequelize } from "sequelize";

import {
  postgresDb,
  postgresPassword,
  postgresUsername,
  postgresHost,
} from "../config";

export const dB = new Sequelize(postgresDb, postgresUsername, postgresPassword, {
  host: postgresHost,
  dialect: "postgres",
  logging:false,
  define:{timestamps:false}
});
