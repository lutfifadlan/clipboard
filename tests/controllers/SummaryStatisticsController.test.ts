import Redis from "ioredis";
import { describe, expect, it, beforeAll, afterAll, vi } from "vitest";
import { SummaryStatisticController } from "../../src/controllers/SummaryStatisticsController";
import { SalaryBatchDataSample } from "../config/sample_data";

vi.mock("ioredis", () => {
  const Redis = vi.fn();
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

describe("Summary Statistics Controller", () => {
  let redisClient, summaryStatisticsController;

  beforeAll(() => {
    redisClient = new Redis();
    summaryStatisticsController = new SummaryStatisticController(redisClient);
  });

  afterAll(() => {
    vi.clearAllMocks();
  });

  describe("getAllRedisValues", () => {
    it("should return all redis values", async () => {
      const allRedisValues =
        await summaryStatisticsController.getAllRedisValues();

      expect(allRedisValues).toEqual(SalaryBatchDataSample);
    });
  });

  describe("fetchSummaryStatsForAllSalaries", () => {
    it("should return summary stats for all salaries", async () => {
      const summaryStats =
        await summaryStatisticsController.fetchSummaryStatsForAllSalaries();

      expect(summaryStats).toEqual({
        mean: 134000,
        min: 110000,
        max: 160000,
      });
    });
  });

  describe("fetchSummaryStatsForAllOnContractSalaries", () => {
    it("should return summary stats for on contract salaries", async () => {
      const summaryStats =
        await summaryStatisticsController.fetchSummaryStatsForAllOnContractSalaries();

      expect(summaryStats).toEqual({
        mean: 120000,
        min: 120000,
        max: 120000,
      });
    });
  });

  describe("fetchSummaryStatsForEachDepartment", () => {
    it("should return summary stats for each department", async () => {
      const summaryStats =
        await summaryStatisticsController.fetchSummaryStatsForEachDepartment();

      expect(summaryStats).toEqual({
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

  describe("fetchSummaryStatsForEachDepartmentAndSubDepartment", () => {
    it("should return summary stats for each department and sub department", async () => {
      const summaryStats =
        await summaryStatisticsController.fetchSummaryStatsForEachDepartmentAndSubDepartment();

      expect(summaryStats).eql({
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
