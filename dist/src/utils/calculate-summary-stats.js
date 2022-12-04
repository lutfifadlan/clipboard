"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculateSummaryStats = void 0;
const underscore_1 = __importDefault(require("underscore"));
const calculateSummaryStats = (salaryDataset) => {
    if (salaryDataset.length === 0) {
        return {
            mean: 0,
            min: 0,
            max: 0,
        };
    }
    const salaries = underscore_1.default.pluck(salaryDataset, "salary");
    const salariesSum = salaries.reduce((a, b) => a + b, 0);
    const meanSalary = salariesSum / salaries.length;
    const minSalary = Math.min(...salaries);
    const maxSalary = Math.max(...salaries);
    return {
        mean: meanSalary,
        min: minSalary,
        max: maxSalary,
    };
};
exports.calculateSummaryStats = calculateSummaryStats;
