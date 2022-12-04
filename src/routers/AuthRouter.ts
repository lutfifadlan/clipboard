import { Request, Response, Router } from "express";

import { AuthController } from "../controllers/AuthController";

class AuthRoute {
  private authController = new AuthController();
  public router = Router();

  constructor() {
    this.router.post("/login", (req: Request, res: Response) => {
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

export = new AuthRoute().router;
