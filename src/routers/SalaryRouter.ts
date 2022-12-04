import { Request, Response, Router } from "express";
import { body, validationResult } from "express-validator";
import Redis from "ioredis";

import { SalaryController } from "../controllers/SalaryController";

class SalaryRoute {
  private redisClient = new Redis({
    host: "redis",
    port: 6379,
  });
  private salaryController = new SalaryController(this.redisClient);
  public router = Router();

  constructor() {
    this.router.post(
      "/",
      body("name").isString().withMessage("name must contains a string"),
      body("salary").isNumeric().withMessage("salary must contains a number"),
      body("currency")
        .isString()
        .withMessage("currency must contains a string"),
      body("department")
        .isString()
        .withMessage("department must contains a string"),
      body("sub_department")
        .isString()
        .withMessage("sub_department must contains a string"),
      body("on_contract")
        .optional()
        .isBoolean()
        .withMessage("on_contract must contains a boolean"),
      async (req: Request, res: Response) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
          return res.status(400).send({
            errors: errors.array(),
          });
        }

        const addedSalary = await this.salaryController.addSalary(req.body);
        res.send(addedSalary);
      }
    );

    this.router.delete("/:id", async (req: Request, res: Response) => {
      const deletedSalary = await this.salaryController.deleteSalary(
        req.params.id
      );

      if (!deletedSalary) {
        res.status(404).send({
          message: "There is no salary with the requested id",
        });
        return;
      }

      res.send(deletedSalary);
    });

    this.router.get("/", async (req: Request, res: Response) => {
      const salaries = await this.salaryController.getAllSalaries();

      res.send(salaries);
    });
  }
}

export = new SalaryRoute().router;
