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
Object.defineProperty(exports, "__esModule", { value: true });
exports.SummaryStatisticController = void 0;
const calculate_summary_stats_1 = require("../utils/calculate-summary-stats");
class SummaryStatisticController {
    constructor(redisClient) {
        this.redisClient = redisClient;
    }
    getAllRedisValues() {
        return __awaiter(this, void 0, void 0, function* () {
            const redisKeys = yield this.redisClient.keys("*");
            const redisValues = yield this.redisClient.mget(redisKeys);
            return redisValues.map((value) => {
                return JSON.parse(value);
            });
        });
    }
    fetchSummaryStatsForAllSalaries() {
        return __awaiter(this, void 0, void 0, function* () {
            const salaries = yield this.getAllRedisValues();
            return (0, calculate_summary_stats_1.calculateSummaryStats)(salaries);
        });
    }
    fetchSummaryStatsForAllOnContractSalaries() {
        return __awaiter(this, void 0, void 0, function* () {
            const allSalaries = yield this.getAllRedisValues();
            const filteredSalaries = allSalaries.filter((salary) => salary.on_contract === true);
            return (0, calculate_summary_stats_1.calculateSummaryStats)(filteredSalaries);
        });
    }
    fetchSummaryStatsForEachDepartment(department) {
        return __awaiter(this, void 0, void 0, function* () {
            const allSalaries = yield this.getAllRedisValues();
            const filteredSalaries = allSalaries.filter((salary) => salary.department === department);
            return (0, calculate_summary_stats_1.calculateSummaryStats)(filteredSalaries);
        });
    }
    fetchSummaryStatsForEachDepartmentAndSubDepartment({ department, subDepartment, }) {
        return __awaiter(this, void 0, void 0, function* () {
            const allSalaries = yield this.getAllRedisValues();
            const filteredSalaries = allSalaries.filter((salary) => salary.department === department &&
                salary.sub_department === subDepartment);
            return (0, calculate_summary_stats_1.calculateSummaryStats)(filteredSalaries);
        });
    }
}
exports.SummaryStatisticController = SummaryStatisticController;
