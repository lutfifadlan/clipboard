"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DummyUser = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
exports.DummyUser = {
    username: "lutfifadlan",
    password: bcrypt_1.default.hashSync("Dummy123!", 10),
    full_name: "Mochamad Lutfi Fadlan",
};
