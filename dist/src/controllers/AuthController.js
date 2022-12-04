"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const dummy_user_1 = require("../config/dummy_user");
class AuthController {
    login({ username, password }) {
        if (username === dummy_user_1.DummyUser.username &&
            bcrypt_1.default.compareSync(password, dummy_user_1.DummyUser.password)) {
            const token = jsonwebtoken_1.default.sign({
                username,
                password,
            }, "accesstoken", { expiresIn: "7d" });
            return {
                username,
                full_name: dummy_user_1.DummyUser.full_name,
                access_token: token,
            };
        }
        return null;
    }
}
exports.AuthController = AuthController;
