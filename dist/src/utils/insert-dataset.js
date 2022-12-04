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
exports.insertDatasetToRedis = void 0;
const salary_dataset_1 = require("../config/salary_dataset");
const insertDatasetToRedis = (redisClient) => __awaiter(void 0, void 0, void 0, function* () {
    redisClient.flushall();
    const salaryDataHashMap = {};
    for (const data of salary_dataset_1.SalaryDataset) {
        salaryDataHashMap[data.id] = JSON.stringify(data);
    }
    redisClient.mset(salaryDataHashMap);
});
exports.insertDatasetToRedis = insertDatasetToRedis;
