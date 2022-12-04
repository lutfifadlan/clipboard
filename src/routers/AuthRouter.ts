import { Request, Response, Router } from "express";
import { body, validationResult } from "express-validator";

import { AuthController } from "../controllers/AuthController";

class AuthRoute {
  private authController = new AuthController();
  public router = Router();

  constructor() {
    this.router.post(
      "/login",
      body("username")
        .isString()
        .withMessage("username must contains a string"),
      body("password")
        .isString()
        .withMessage("password must contains a string"),
      (req: Request, res: Response) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
          return res.status(400).send({
            errors: errors.array(),
          });
        }

        const { username, password } = req.body;

        const user = this.authController.login({ username, password });

        if (!user) {
          res.status(401).send({
            message: "Invalid username or password",
          });
          return;
        }

        res.send(user);
      }
    );
  }
}

export = new AuthRoute().router;
