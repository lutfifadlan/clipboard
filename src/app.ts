import express from "express";
import cors from "cors";
import helmet from "helmet";
import Redis from "ioredis";
import morgan from "morgan";
import { createStream } from "rotating-file-stream";
import path from "path";
import log4js from "log4js";

import SalaryRouter from "./routers/SalaryRouter";
import SummaryStatisticsRouter from "./routers/SummaryStatisticsRouter";
import AuthRouter from "./routers/AuthRouter";
import { authorizationMiddleware } from "./middlewares/authorization-middleware";
import { insertDatasetToRedis } from "./utils/insert-dataset";

const accessLogStream = createStream("access.log", {
  interval: "1d",
  path: path.join(__dirname, "log"),
});
const logger = log4js.getLogger();
logger.level = "info";

const app = express();
const redis = new Redis({
  host: "redis",
  port: 6379,
});

app.use(morgan("combined", { stream: accessLogStream }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(helmet());
app.use("/auth", AuthRouter);
app.use("/salaries", authorizationMiddleware, SalaryRouter);
app.use(
  "/salary-summary-stats",
  authorizationMiddleware,
  SummaryStatisticsRouter
);

(async () => await insertDatasetToRedis(redis))();

export = app;
