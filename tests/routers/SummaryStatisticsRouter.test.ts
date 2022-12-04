import chai from "chai";
import chaiHttp from "chai-http";
import { describe, test, expect, vi, afterAll, beforeAll } from "vitest";

import app from "../../src/server";
import { AuthController } from "../../src/controllers/AuthController";
import { SalaryBatchDataSample } from "../config/sample_data";
import { IUserData } from "../../src/interfaces/user-data.interface";

chai.use(chaiHttp);

vi.mock("ioredis", () => {
  const Redis = vi.fn();
  Redis.prototype.flushall = vi.fn();
  Redis.prototype.mset = vi.fn();
  Redis.prototype.keys = vi.fn(() => [
    "d7f8d090-7555-482e-8c9e-64984bb3db6e",
    "0e2a60ae-f0e2-4a1f-b732-1fe931109a22",
    "fc06e5f3-0669-4a55-8652-3da01477b33d",
    "26febbe4-eff6-40bb-8c00-d31aa2f0ce4f",
    "66be42f7-1a9c-43b1-9d38-bf5ffd0fc626",
  ]);
  Redis.prototype.mget = vi.fn(() => [
    JSON.stringify(SalaryBatchDataSample[0]),
    JSON.stringify(SalaryBatchDataSample[1]),
    JSON.stringify(SalaryBatchDataSample[2]),
    JSON.stringify(SalaryBatchDataSample[3]),
    JSON.stringify(SalaryBatchDataSample[4]),
  ]);

  return {
    default: Redis,
  };
});

describe("/salary-summary-stats", () => {
  let authController: AuthController;
  let userData: IUserData;

  beforeAll(async () => {
    authController = new AuthController();

    userData = authController.login({
      username: "lutfifadlan",
      password: "Dummy123!",
    }) as IUserData;
  });

  afterAll(() => {
    vi.clearAllMocks();
  });

  describe("GET /", () => {
    test("failed to get all salary summary stats due to token is not provided", async () => {
      const response = await chai.request(app).get("/salary-summary-stats");

      expect(response.status).toEqual(401);
      expect(response.body).toEqual({
        message: "Token is not provided",
      });
    });

    test("failed to get all salary summary stats due to token is invalid", async () => {
      const response = await chai
        .request(app)
        .get("/salary-summary-stats")
        .auth("random", { type: "bearer" });

      expect(response.status).toEqual(403);
      expect(response.body).toEqual({
        message: "Token is invalid",
      });
    });

    test("successfully get all salary summary stats", async () => {
      const response = await chai
        .request(app)
        .get("/salary-summary-stats")
        .auth(userData.access_token as string, { type: "bearer" });

      expect(response.status).toEqual(200);
      expect(response.body).toEqual({
        mean: 134000,
        min: 110000,
        max: 160000,
      });
    });
  });

  describe("GET /on-contract", () => {
    test("successfully get on contract salary summary stats", async () => {
      const response = await chai
        .request(app)
        .get("/salary-summary-stats/on-contract");

      expect(response.status).toEqual(401);
      expect(response.body).toEqual({
        message: "Token is not provided",
      });
    });

    test("successfully get on contract salary summary stats", async () => {
      const response = await chai
        .request(app)
        .get("/salary-summary-stats/on-contract")
        .auth("random", { type: "bearer" });

      expect(response.status).toEqual(403);
      expect(response.body).toEqual({
        message: "Token is invalid",
      });
    });

    test("successfully get on contract salary summary stats", async () => {
      const response = await chai
        .request(app)
        .get("/salary-summary-stats/on-contract")
        .auth(userData.access_token as string, { type: "bearer" });

      expect(response.status).toEqual(200);
      expect(response.body).toEqual({
        mean: 120000,
        min: 120000,
        max: 120000,
      });
    });
  });

  describe("GET /each-department", () => {
    test("successfully get each department salary summary stats", async () => {
      const response = await chai
        .request(app)
        .get("/salary-summary-stats/each-department");

      expect(response.status).toEqual(401);
      expect(response.body).toEqual({
        message: "Token is not provided",
      });
    });

    test("successfully get each department salary summary stats", async () => {
      const response = await chai
        .request(app)
        .get("/salary-summary-stats/each-department")
        .auth("random", { type: "bearer" });

      expect(response.status).toEqual(403);
      expect(response.body).toEqual({
        message: "Token is invalid",
      });
    });

    test("successfully get each department salary summary stats", async () => {
      const response = await chai
        .request(app)
        .get("/salary-summary-stats/each-department")
        .auth(userData.access_token as string, { type: "bearer" });

      expect(response.status).toEqual(200);
      expect(response.body).toEqual({
        Business: {
          mean: 120000,
          min: 120000,
          max: 120000,
        },
        Engineering: {
          mean: 146667,
          min: 130000,
          max: 160000,
        },
        Operations: {
          mean: 110000,
          min: 110000,
          max: 110000,
        },
      });
    });
  });

  describe("GET /each-department-and-sub-department", () => {
    test("successfully get each department and sub department salary summary stats", async () => {
      const response = await chai
        .request(app)
        .get("/salary-summary-stats/each-department-and-sub-department");

      expect(response.status).toEqual(401);
      expect(response.body).toEqual({
        message: "Token is not provided",
      });
    });

    test("successfully get each department and sub department salary summary stats", async () => {
      const response = await chai
        .request(app)
        .get("/salary-summary-stats/each-department-and-sub-department")
        .auth("random", { type: "bearer" });

      expect(response.status).toEqual(403);
      expect(response.body).toEqual({
        message: "Token is invalid",
      });
    });

    test("successfully get each department and sub department salary summary stats", async () => {
      const response = await chai
        .request(app)
        .get("/salary-summary-stats/each-department-and-sub-department")
        .auth(userData.access_token as string, { type: "bearer" });

      expect(response.status).toEqual(200);
      expect(response.body).toEqual({
        Business: {
          Sales: {
            mean: 120000,
            min: 120000,
            max: 120000,
          },
        },
        Engineering: {
          Platform: {
            mean: 150000,
            min: 150000,
            max: 150000,
          },
          Product: {
            mean: 145000,
            min: 130000,
            max: 160000,
          },
        },
        Operations: {
          Hospital: {
            mean: 110000,
            min: 110000,
            max: 110000,
          },
        },
      });
    });
  });
});
