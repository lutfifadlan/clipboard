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
const express_1 = require("express");
const SummaryStatisticsController_1 = require("../controllers/SummaryStatisticsController");
const ioredis_1 = __importDefault(require("ioredis"));
class SummaryStatisticsRoute {
    constructor() {
        this.redisClient = new ioredis_1.default({
            host: "redis",
            port: 6379,
        });
        this.summaryStatsController = new SummaryStatisticsController_1.SummaryStatisticController(this.redisClient);
        this.router = (0, express_1.Router)();
        this.router.get("/", (req, res) => __awaiter(this, void 0, void 0, function* () {
            const allSalarySummaryStats = yield this.summaryStatsController.fetchSummaryStatsForAllSalaries();
            res.send(allSalarySummaryStats);
        }));
        this.router.get("/on-contract", (req, res) => __awaiter(this, void 0, void 0, function* () {
            const onContractSalarySummaryStats = yield this.summaryStatsController.fetchSummaryStatsForAllOnContractSalaries();
            res.send(onContractSalarySummaryStats);
        }));
        this.router.get("/department/:department", (req, res) => __awaiter(this, void 0, void 0, function* () {
            const eachDepartmentSalarySummaryStats = yield this.summaryStatsController.fetchSummaryStatsForEachDepartment(req.params.department);
            res.send(eachDepartmentSalarySummaryStats);
        }));
        this.router.get("/department/:department/sub_department/:sub_department", (req, res) => __awaiter(this, void 0, void 0, function* () {
            const eachDepartmentAndSubDepartmentSalarySummaryStats = yield this.summaryStatsController.fetchSummaryStatsForEachDepartmentAndSubDepartment({
                department: req.params.department,
                subDepartment: req.params.sub_department,
            });
            res.send(eachDepartmentAndSubDepartmentSalarySummaryStats);
        }));
    }
}
module.exports = new SummaryStatisticsRoute().router;
