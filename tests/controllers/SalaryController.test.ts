import Redis from "ioredis";
import { describe, expect, it, vi, beforeAll, afterAll } from "vitest";
import { SalaryController } from "../../src/controllers/SalaryController";
import { ISalaryDatasetWithId } from "../../src/interfaces/salary-dataset.interface";
import { SalaryDataSample, SalaryBatchDataSample } from "../config/sample_data";

vi.mock("ioredis", () => {
  const Redis = vi.fn();
  Redis.prototype.set = vi.fn();
  Redis.prototype.getdel = vi.fn(() => {
    return JSON.stringify(SalaryDataSample);
  });
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

describe("Salary Controller", () => {
  let redisClient: Redis;
  let addedSalary: ISalaryDatasetWithId;
  let salaryController: SalaryController;

  beforeAll(() => {
    redisClient = new Redis();
    salaryController = new SalaryController(redisClient);
  });

  afterAll(() => {
    vi.clearAllMocks();
  });

  describe("addSalary", () => {
    it("should return added salary", async () => {
      addedSalary = await salaryController.addSalary(SalaryDataSample);

      expect(addedSalary).toContain(SalaryDataSample);
    });
  });

  describe("deleteSalary", () => {
    it("should return deleted salary", async () => {
      const deletedSalary = await salaryController.deleteSalary(addedSalary.id);

      expect(deletedSalary).toContain(SalaryDataSample);
    });
  });

  describe("getAllSalaries", () => {
    it("should return all salaries", async () => {
      const salaries = await salaryController.getAllSalaries();

      expect(salaries).toEqual(SalaryBatchDataSample);
    });
  });
});
