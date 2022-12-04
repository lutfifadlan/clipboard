import chai from "chai";
import chaiHttp from "chai-http";
import Redis from "ioredis";
import { describe, test, expect, vi, afterAll, beforeAll } from "vitest";

import app from "../../src/server";
import { SalaryController } from "../../src/controllers/SalaryController";
import { AuthController } from "../../src/controllers/AuthController";
import { SalaryDataSample } from "../config/sample_data";
import { ISalaryDatasetWithId } from "../../src/interfaces/salary-dataset.interface";
import { IUserData } from "../../src/interfaces/user-data.interface";

chai.use(chaiHttp);

vi.mock("ioredis", () => {
  const Redis = vi.fn();
  Redis.prototype.flushall = vi.fn();
  Redis.prototype.mset = vi.fn();
  Redis.prototype.set = vi.fn();
  Redis.prototype.getdel = vi.fn(() => {
    return JSON.stringify({
      id: "48869ca7-3321-4392-9d8a-71c6c1efd06c",
      name: "John",
      salary: 130000,
      currency: "USD",
      department: "Engineering",
      sub_department: "Product",
    });
  });

  return {
    default: Redis,
  };
});

describe("/salaries", () => {
  let redisClient: Redis;
  let salaryController: SalaryController;
  let authController: AuthController;
  let addedSalary: ISalaryDatasetWithId;
  let userData: IUserData;

  beforeAll(async () => {
    redisClient = new Redis();
    salaryController = new SalaryController(redisClient);
    authController = new AuthController();

    addedSalary = await salaryController.addSalary(SalaryDataSample);
    userData = authController.login({
      username: "lutfifadlan",
      password: "Dummy123!",
    }) as IUserData;
  });

  afterAll(() => {
    vi.clearAllMocks();
  });

  describe("POST /", () => {
    test("failed to add salary due to token is not provided", async () => {
      const response = await chai.request(app).post("/salaries").send({
        name: "Michael",
        salary: 130000,
        currency: "USD",
        department: "Engineering",
        sub_department: "Product",
      });

      expect(response.status).toEqual(401);
      expect(response.body).toEqual({
        message: "Token is not provided",
      });
    });

    test("failed to add salary due to token is invalid", async () => {
      const response = await chai
        .request(app)
        .post("/salaries")
        .auth("random", { type: "bearer" })
        .send({
          name: "Michael",
          salary: 130000,
          currency: "USD",
          department: "Engineering",
          sub_department: "Product",
        });

      expect(response.status).toEqual(403);
      expect(response.body).toEqual({
        message: "Token is invalid",
      });
    });

    test("failed to add salary due to invalid request", async () => {
      const response = await chai
        .request(app)
        .post("/salaries")
        .auth(userData.access_token as string, { type: "bearer" })
        .send("");

      expect(response.status).toEqual(400);
      expect(response.body).toEqual({
        errors: [
          {
            location: "body",
            msg: "name must contains a string",
            param: "name",
          },
          {
            location: "body",
            msg: "salary must contains a number",
            param: "salary",
          },
          {
            location: "body",
            msg: "currency must contains a string",
            param: "currency",
          },
          {
            location: "body",
            msg: "department must contains a string",
            param: "department",
          },
          {
            location: "body",
            msg: "sub_department must contains a string",
            param: "sub_department",
          },
        ],
      });
    });

    test("successfully add salary", async () => {
      const response = await chai
        .request(app)
        .post("/salaries")
        .auth(userData.access_token as string, { type: "bearer" })
        .send({
          name: "Michael",
          salary: 130000,
          currency: "USD",
          department: "Engineering",
          sub_department: "Product",
        });

      expect(response.status).toEqual(200);
      expect(response.body).toContain({
        name: "Michael",
        salary: 130000,
        currency: "USD",
        department: "Engineering",
        sub_department: "Product",
      });
    });
  });

  describe("DELETE /:id", () => {
    test("failed to delete salary due to token is not provided", async () => {
      const response = await chai
        .request(app)
        .delete(`/salaries/${addedSalary.id}`);

      expect(response.status).toEqual(401);
      expect(response.body).toEqual({
        message: "Token is not provided",
      });
    });

    test("failed to delete salary due to token is invalid", async () => {
      const response = await chai
        .request(app)
        .delete(`/salaries/${addedSalary.id}`)
        .auth("random", { type: "bearer" });

      expect(response.status).toEqual(403);
      expect(response.body).toEqual({
        message: "Token is invalid",
      });
    });

    test("successfully delete salary", async () => {
      const response = await chai
        .request(app)
        .delete(`/salaries/${addedSalary.id}`)
        .auth(userData.access_token as string, { type: "bearer" });

      expect(response.status).toEqual(200);
      expect(response.body).toContain({
        name: "John",
        salary: 130000,
        currency: "USD",
        department: "Engineering",
        sub_department: "Product",
      });
    });
  });
});
