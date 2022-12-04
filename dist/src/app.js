"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const ioredis_1 = __importDefault(require("ioredis"));
const morgan_1 = __importDefault(require("morgan"));
const rotating_file_stream_1 = require("rotating-file-stream");
const path_1 = __importDefault(require("path"));
const log4js_1 = __importDefault(require("log4js"));
const SalaryRouter_1 = __importDefault(require("./routers/SalaryRouter"));
const SummaryStatisticsRouter_1 = __importDefault(require("./routers/SummaryStatisticsRouter"));
const AuthRouter_1 = __importDefault(require("./routers/AuthRouter"));
const insert_dataset_1 = require("./utils/insert-dataset");
const authorization_middlware_1 = require("./middlwares/authorization-middlware");
const accessLogStream = (0, rotating_file_stream_1.createStream)("access.log", {
    interval: "1d",
    path: path_1.default.join(__dirname, "log"),
});
const logger = log4js_1.default.getLogger();
logger.level = "info";
const app = (0, express_1.default)();
const redis = new ioredis_1.default({
    host: "redis",
    port: 6379,
});
app.use((0, morgan_1.default)("combined", { stream: accessLogStream }));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cors_1.default)());
app.use((0, helmet_1.default)());
app.use("/auth", AuthRouter_1.default);
app.use("/salaries", SalaryRouter_1.default, authorization_middlware_1.authorizationMiddleware);
app.use("/salary-summary-stats", SummaryStatisticsRouter_1.default, authorization_middlware_1.authorizationMiddleware);
(() => __awaiter(void 0, void 0, void 0, function* () { return yield (0, insert_dataset_1.insertDatasetToRedis)(redis); }))();
module.exports = app;
