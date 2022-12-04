"use strict";
const express_1 = require("express");
const AuthController_1 = require("../controllers/AuthController");
class AuthRoute {
    constructor() {
        this.authController = new AuthController_1.AuthController();
        this.router = (0, express_1.Router)();
        this.router.post("/login", (req, res) => {
            const { username, password } = req.body;
            const user = this.authController.login({ username, password });
            if (!user) {
                res.status(401).send({
                    message: "Invalid username or password",
                });
                return;
            }
            res.send(user);
        });
    }
}
module.exports = new AuthRoute().router;
