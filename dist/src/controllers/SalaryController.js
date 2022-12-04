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
Object.defineProperty(exports, "__esModule", { value: true });
exports.SalaryController = void 0;
const uuid_1 = require("uuid");
const underscore_1 = __importDefault(require("underscore"));
class SalaryController {
    constructor(redisClient) {
        this.redisClient = redisClient;
    }
    addSalary(salaryData) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = (0, uuid_1.v4)();
            const addedSalaryData = underscore_1.default.defaults({ id }, salaryData);
            yield this.redisClient.set(id, JSON.stringify(addedSalaryData));
            return addedSalaryData;
        });
    }
    deleteSalary(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const deletedSalary = yield this.redisClient.getdel(id);
            if (!deletedSalary) {
                return null;
            }
            return JSON.parse(deletedSalary);
        });
    }
    getAllSalaries() {
        return __awaiter(this, void 0, void 0, function* () {
            const redisKeys = yield this.redisClient.keys("*");
            const redisValues = yield this.redisClient.mget(redisKeys);
            return redisValues.map((value) => {
                return JSON.parse(value);
            });
        });
    }
}
exports.SalaryController = SalaryController;
