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
const ioredis_1 = __importDefault(require("ioredis"));
const SalaryController_1 = require("../controllers/SalaryController");
class SalaryRoute {
    constructor() {
        this.redisClient = new ioredis_1.default({
            host: "redis",
            port: 6379,
        });
        this.salaryController = new SalaryController_1.SalaryController(this.redisClient);
        this.router = (0, express_1.Router)();
        this.router.post("/", (req, res) => __awaiter(this, void 0, void 0, function* () {
            const addedSalary = yield this.salaryController.addSalary(req.body);
            res.send(addedSalary);
        }));
        this.router.delete("/:id", (req, res) => __awaiter(this, void 0, void 0, function* () {
            const deletedSalary = yield this.salaryController.deleteSalary(req.params.id);
            if (!deletedSalary) {
                res.status(404).send({
                    message: "There is no salary with the requested id",
                });
                return;
            }
            res.send(deletedSalary);
        }));
        this.router.get("/", (req, res) => __awaiter(this, void 0, void 0, function* () {
            const salaries = yield this.salaryController.getAllSalaries();
            res.send(salaries);
        }));
    }
}
module.exports = new SalaryRoute().router;
