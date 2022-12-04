"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SalaryDataset = void 0;
const uuid_1 = require("uuid");
const underscore_1 = __importDefault(require("underscore"));
const originalSalaryDataset = [
    {
        name: "Abhishek",
        salary: 145000,
        currency: "USD",
        department: "Engineering",
        sub_department: "Platform",
    },
    {
        name: "Anurag",
        salary: 90000,
        currency: "USD",
        department: "Banking",
        on_contract: true,
        sub_department: "Loan",
    },
    {
        name: "Himani",
        salary: 240000,
        currency: "USD",
        department: "Engineering",
        sub_department: "Platform",
    },
    {
        name: "Yatendra",
        salary: 30,
        currency: "USD",
        department: "Operations",
        sub_department: "CustomerOnboarding",
    },
    {
        name: "Ragini",
        salary: 30,
        currency: "USD",
        department: "Engineering",
        sub_department: "Platform",
    },
    {
        name: "Nikhil",
        salary: 110000,
        currency: "USD",
        on_contract: true,
        department: "Engineering",
        sub_department: "Platform",
    },
    {
        name: "Guljit",
        salary: 30,
        currency: "USD",
        department: "Administration",
        sub_department: "Agriculture",
    },
    {
        name: "Himanshu",
        salary: 70000,
        currency: "EUR",
        department: "Operations",
        sub_department: "CustomerOnboarding",
    },
    {
        name: "Anupam",
        salary: 200000000,
        currency: "INR",
        department: "Engineering",
        sub_department: "Platform",
    },
];
exports.SalaryDataset = originalSalaryDataset.map((data) => underscore_1.default.defaults({ id: (0, uuid_1.v4)() }, data));
