"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authorizationMiddleware = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const authorizationMiddleware = (req, res, next) => {
    const authorizationHeader = req.headers["authorization"];
    const token = authorizationHeader && authorizationHeader.split(" ")[1];
    if (!token) {
        res.status(401).send({
            message: "Token is not provided",
        });
        return;
    }
    jsonwebtoken_1.default.verify(token, "accesstoken", (err) => {
        if (err) {
            res.status(403).send({
                message: "Token is invalid",
            });
            return;
        }
        next();
    });
};
exports.authorizationMiddleware = authorizationMiddleware;
