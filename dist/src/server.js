"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const log4js_1 = __importDefault(require("log4js"));
const app_1 = __importDefault(require("./app"));
const logger = log4js_1.default.getLogger();
const port = process.env.APP_PORT || 3000;
logger.level = "info";
app_1.default.listen(port, () => {
    logger.info(`App listening on the port ${port}`);
});
