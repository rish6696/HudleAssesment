import express, { Request, Response, urlencoded, NextFunction } from "express";
import { router } from "./routes/index";
import { PORT } from "./config";
import { dB } from "./utilities/databaseService";
import { EmployeesModel } from "./models/employees";
import { EmployersModel } from "./models/employers";
import { JobModel } from "./models/job";
import { JobEmployeeMap } from "./models/jobEmployeeMap";
import { APIError } from "./utilities/APIError";
import { NOT_FOUND } from "./utilities/errorConstants";
import { errorHandler } from "./middlewares/errorMiddleware";
import CookieParser from 'cookie-parser'

const app = express();

app.use(CookieParser())

app.use(urlencoded({ extended: true }));
app.use(express.json());

app.use("/api", router);

app.use((req: Request, res: Response, next: NextFunction) => {
  next(new APIError(404, NOT_FOUND));
});

app.use(errorHandler);

const mapRelations = () => {
  JobEmployeeMap.belongsTo(JobModel);
  JobEmployeeMap.belongsTo(EmployeesModel);

  JobModel.belongsTo(EmployersModel);
  JobModel.hasMany(JobEmployeeMap);

  EmployersModel.hasMany(JobModel);
};

app.listen(PORT, (): void => {
  dB.authenticate()
    .then((x) => {
        mapRelations()
        console.log("*********************Server started**************************")
    })
    .catch((e) => console.log(e));
});
